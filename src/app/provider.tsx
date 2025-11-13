"use client"

import { store } from "@/store/store";
import { Provider } from "react-redux";


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
}