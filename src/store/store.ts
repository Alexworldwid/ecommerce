import {configureStore} from "@reduxjs/toolkit"
import { cartSlice } from "./cartslice";
import { wishlistSlice } from "./wishlistslice";


export const store = configureStore({
    reducer: {
        // add your slices here
        cart: cartSlice.reducer,
        wishlist: wishlistSlice.reducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;