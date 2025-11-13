import { createClient } from "@/utils/supabase/client";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type { CartItem } from "../app/types/cart";
import { getCachedData, setCachedData } from "@/utils/localCache";
import toast from "react-hot-toast";


export const syncCartOnLogin = createAsyncThunk(
  'cart/syncWithSupabaseCart',
  async ({ userId, localItems }: { userId: string; localItems: CartItem[] }) => {
    const supabase = createClient();

    if (!localItems.length) return;

    for (const localItem of localItems) {
      // Get existing amount if it exists
      const { data: existing } = await supabase
        .from('cart')
        .select('amount')
        .eq('user_id', userId)
        .eq('product_id', localItem.product_id)
        .eq('size', localItem.size)
        .eq('color', localItem.color)
        .maybeSingle();

      let newAmount: number;

      if (existing) {
        // If exists, decide how to merge: use the larger amount or just overwrite
        // Here we overwrite with local amount
        newAmount = localItem.amount;
      } else {
        newAmount = localItem.amount;
      }

      // ✅ Use upsert (respecting unique constraint)
      const { error } = await supabase
        .from('cart')
        .upsert(
          {
            user_id: userId,
            product_id: localItem.product_id,
            size: localItem.size,
            color: localItem.color,
            amount: newAmount,
          },
          { onConflict: 'user_id,product_id,size,color' }
        );

      if (error) console.error('❌ Error syncing cart item:', error);
    }
  }
);


// fetch cart from supabase
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId: string) => {
        const supabase = createClient();
        const {data, error} = await supabase
        .from('cart')
        .select(`*, products (id, name, price, image)`)
        .eq('user_id', userId);

        if (error) throw error;

        return data.map((item: CartItem) => ({
            id: item.id,
            product_id: item.product_id,
            color: item.color,
            size: item.size,
            amount: item.amount,
            user_id: item.user_id,
            products: item.products
        })) as CartItem[];

    }
);




export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ item, userId }: { item: CartItem; userId: string }, { dispatch }) => {
    // Always add locally first
    dispatch(addToCartLocal(item));

    if (!userId) return;

    const supabase = createClient();


    // Check if item already exists for the user
    const { data: existing } = await supabase
      .from('cart')
      .select('amount')
      .eq('user_id', userId)
      .eq('product_id', item.product_id)
      .eq('size', item.size)
      .eq('color', item.color)
      .maybeSingle();

    const newAmount = existing ? existing.amount + item.amount : item.amount;

    // ✅ Use upsert to prevent duplicates
    const { error } = await supabase.from('cart').upsert(
      {
        user_id: userId,
        product_id: item.product_id,
        size: item.size,
        color: item.color,
        amount: newAmount,
      },
      { onConflict: 'user_id,product_id,size,color' }
    );

    if (error) {
      console.error('❌ Error adding to cart:', error);
      throw error;
    }

    await dispatch(fetchCart(userId))
  }
);


export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({product_id, size, color, user_id}: {product_id: string, size: string, color: string, user_id: string}, {dispatch}) => {
        dispatch(removeFromCartLocal({product_id, size, color}));

        if (!user_id) return;

        const supabase = createClient()

        const {error} = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .eq('size', size)
        .eq('color', color)

        if (error) {
            console.error('❌ Error removing item from cart:', error);
            throw error;
        } else {
            console.log('✅ Item removed from Supabase cart successfully');
        }
    }
)


export const increaseAmount = createAsyncThunk(
  'cart/increaseAmount',
  async ({ product_id, size, color, user_id }: { product_id: string; size: string; color: string; user_id: string }, { dispatch }) => {

    // 3️⃣ Update local state
    dispatch(increaseAmountLocal({ product_id, size, color }));


    if (!user_id) return;

    const supabase = createClient();

    // 1️⃣ Fetch current amount from Supabase
    const { data: existingItem, error: fetchError } = await supabase
      .from('cart')
      .select('id, amount')
      .eq('user_id', user_id)
      .eq('product_id', product_id)
      .eq('size', size)
      .eq('color', color)
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('❌ Error fetching item for increase:', fetchError);
      throw fetchError;
    }

    if (!existingItem) {
      console.warn('⚠️ Tried to increase non-existent item in Supabase cart.');
      return;
    }

    const newAmount = existingItem.amount + 1;

    // 2️⃣ Update Supabase
    const { error: updateError } = await supabase
      .from('cart')
      .upsert({ 
        product_id: product_id,
        size: size,
        color: color,
        user_id: user_id,
        amount: newAmount 
    }, { onConflict: 'user_id,product_id,size,color' })

    if (updateError) {
      console.error('❌ Error updating cart item amount:', updateError);
      throw updateError;
    }

    
  }
);



export const decreaseAmount = createAsyncThunk(
  'cart/decreaseAmount',
  async ({ product_id, size, color, user_id }: { product_id: string; size: string; color: string; user_id: string }, { dispatch }) => {
    dispatch(decreaseAmountLocal({ product_id, size, color }));
    if (!user_id) return;

    const supabase = createClient();

    const { data: existingItem, error: fetchError } = await supabase
      .from('cart')
      .select('id, amount')
      .eq('user_id', user_id)
      .eq('product_id', product_id)
      .eq('size', size)
      .eq('color', color)
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('❌ Error fetching item for decrease:', fetchError);
      throw fetchError;
    }

    if (!existingItem) return;

    if (existingItem.amount > 1) {
      const newAmount = existingItem.amount - 1;
      const { error: updateError } = await supabase
        .from('cart')
        .upsert({
            product_id: product_id,
            size: size,
            color: color,
            user_id: user_id,
            amount: newAmount 
        }, { onConflict: 'user_id,product_id,size,color' })
        .eq('id', existingItem.id);

      if (updateError) {
        console.error('❌ Error updating cart item amount:', updateError);
        throw updateError;
      }

    } else {
      // delete item
      const { error: deleteError } = await supabase
        .from('cart')
        .delete()
        .eq('id', existingItem.id);

      if (deleteError) {
        console.error('❌ Error deleting cart item:', deleteError);
        throw deleteError;
      }

      dispatch(removeFromCartLocal({ product_id, size, color }));
    }
  }
);
 



interface CartState {
    items: CartItem[];
    loading: boolean;
}

const initialState: CartState = {
    items: [],
    loading: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCartLocal(state, action: PayloadAction<CartItem>) {
            const CartItem = action.payload;
            const existing = state.items.find(
                (item) => 
                    item.product_id === CartItem.product_id && 
                    item.size === CartItem.size && 
                    item.color === CartItem.color 
            )

            if (existing) {
                existing.amount += CartItem.amount;
            } else {
                state.items.push(CartItem);
            }

            setCachedData('cartItems', state.items);
            toast.success('Added to cart');
        },

        removeFromCartLocal(state, action: PayloadAction<{product_id: string; size: string; color: string;}>) {
            const {product_id, size, color} = action.payload;
            state.items = state.items.filter(
                (item) =>
                    !(item.product_id === product_id && item.size === size && item.color === color)
            );

            setCachedData('cartItems', state.items);
            toast.success('Removed from cart');
        },

        increaseAmountLocal(state, action: PayloadAction<{product_id: string; size: string; color: string;}>) {
            const {product_id, size, color} = action.payload;
            const item = state.items.find(
                (item) =>
                    item.product_id === product_id &&
                    item.size === size &&
                    item.color === color
            )
            if (item) item.amount += 1;
            setCachedData('cartItems', state.items);
        },

        decreaseAmountLocal(state, action: PayloadAction<{product_id: string; size: string; color: string;}>) {
            const {product_id, size, color} = action.payload;
            const item = state.items.find(
                (item) =>
                    item.product_id === product_id &&
                    item.size === size &&
                    item.color === color
            )
            if (item && item.amount > 1) item.amount -= 1;
            else {
                state.items = state.items.filter(
                    item => !(item.product_id === product_id && item.size === size && item.color === color
                ));
            }

            setCachedData('cartItems', state.items);
        },

        clearCartLocal: (state) => {
            state.items = [];
            setCachedData('cartItems', state.items);
        },
        loadLocalCart: (state) => {
            const localCart = (getCachedData('cartItems') as CartItem[]) || [];
            state.items = localCart;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCart.fulfilled,  (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchCart.rejected, (state) => {
            state.loading = false;
        })
    }
})


export const {addToCartLocal, removeFromCartLocal, increaseAmountLocal, decreaseAmountLocal, clearCartLocal, loadLocalCart} = cartSlice.actions;

export default cartSlice.reducer;