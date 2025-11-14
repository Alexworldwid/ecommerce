import { getCachedData, setCachedData } from "@/utils/localCache";
import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { WishlistItem } from "@/app/types/wishlist";

// --------------------
// THUNKS
// --------------------

// Fetch wishlist from Supabase (for logged-in users)
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("wishlist")
      .select("*, products (id, name, image, price)")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data.map((item: WishlistItem) => ({
      id: item.id,
      product_id: item.product_id,
      user_id: item.user_id,
      products: item.products,
      color: item.color,
      size: item.size,
      created_at: item.created_at
    }));
  }
);

// Load wishlist from local cache
export const loadWishlistLocal = createAsyncThunk(
  "wishlist/loadWishlistLocal",
  async () => {
    const cached = getCachedData("wishlist") || [];
    return cached;
  }
);


export const syncWishlistOnLogin = createAsyncThunk(
  "wishlist/syncWishlistOnLogin",
  async (userId: string, { dispatch }) => {
    const supabase = createClient();
    const localWishlist = (getCachedData("wishlist") || []) as WishlistItem[];

    if (!localWishlist.length) {
      // No local items → just fetch from Supabase
      await dispatch(fetchWishlist(userId));
      return;
    }

    // Fetch existing wishlist from Supabase
    const { data: remoteWishlist, error } = await supabase
      .from("wishlist")
      .select("product_id, color, size")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist:", error);
      return;
    }

    // Find items that exist locally but not remotely
    const newItems = localWishlist.filter(
      (local) =>
        !remoteWishlist?.some(
          (remote) =>
            remote.product_id === local.product_id 
        )
    );

    // Insert missing items into Supabase
    if (newItems.length > 0) {
      const { error: insertError } = await supabase.from("wishlist").insert(
        newItems.map((item) => ({
          user_id: userId,
          product_id: item.product_id,
          color: item.color,
          size: item.size,
        }))
      );

      if (insertError) console.error("Error syncing wishlist:", insertError);
    }

    // Clear local wishlist (since it’s now stored remotely)
    setCachedData("wishlist", []);

    // Refresh Redux state
    dispatch(fetchWishlist(userId));
  }
);





// Toggle wishlist item (add/remove)
export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleWishlistItem",
  async (item: WishlistItem, { dispatch }) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Not logged in → local wishlist
    if (!user) {
      const cached = (getCachedData("wishlist") || []) as WishlistItem[];
      const exists = cached.some((c) =>
          c.product_id === item.product_id 
      );

      if (exists) {
        dispatch(removeFromWishlistLocal(item));
      } else {
        dispatch(addToWishlistLocal(item));
      }
      return;
    }

    // Logged in → Supabase wishlist
    const { data: existing, error: fetchError } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", item.product_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError);
      throw fetchError;
    }

    if (existing) {
      // Remove from wishlist
      const { error: deleteError } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", existing.id);

      if (deleteError) throw deleteError;

      toast.success("Item removed from wishlist");
    } else {
      // Add to wishlist
      const { error: insertError } = await supabase.from("wishlist").insert([
        {
          user_id: user.id,
          product_id: item.product_id,
          color: item.color,
          size: item.size,
        },
      ]);

      if (insertError) throw insertError;

      toast.success("Item added to wishlist");
    }

    // Refetch to sync state
    dispatch(fetchWishlist(user.id));
  }
);


// --------------------
// SLICE
// --------------------

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlistLocal(state, action: PayloadAction<WishlistItem>) {
      const newItem = action.payload;

      const exists = state.items.some(
        (item) =>
          item.product_id === newItem.product_id
      );

      if(exists) {
        toast.success("Item is already in wishlist");
      } else  {
        state.items.push(newItem);
        toast.success("Item added to wishlist");
      }

      setCachedData("wishlist", state.items);
    },

    removeFromWishlistLocal(state, action: PayloadAction<WishlistItem>) {
      const removeItem = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product_id === removeItem.product_id
          )
      );

      setCachedData("wishlist", state.items);
      toast.success("Item removed from wishlist");
    },

    clearWishlistLocal(state) {
      state.items = [];
      setCachedData("wishlist", []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        setCachedData("wishlist", action.payload);
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadWishlistLocal.fulfilled, (state, action) => {
        state.items = action.payload as WishlistItem[];
      })
  },
});

export const {
  addToWishlistLocal,
  removeFromWishlistLocal,
  clearWishlistLocal,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
