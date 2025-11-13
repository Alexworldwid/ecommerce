import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Products } from "@/app/types/product";


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const supabase = createClient();
        const { data, error} = await supabase
        .from("products")
        .select("*")

        if (error) throw error

        return data 
    }
)

type ProductState = {
    items: Products[],
    loading: boolean
}

const initialState: ProductState = {
    items: [],
    loading: false
} 


export const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.loading = false
        })
    }
})

export default productSlice.reducer