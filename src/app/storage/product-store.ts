import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ProductModel } from "../models/product.model"
import { count } from "rxjs";
import { computed } from "@angular/core";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { environment } from "../../environments/environment";

export type ProductState = {
    products: ProductModel[];
}

const initialState: ProductState = {
    products: []
};

export const ProductStore = signalStore(
    {providedIn: "root"},
    withState(initialState), 
    withMethods(store => ({
        initProducts(products: ProductModel[]): void {
            patchState(store, currentState => ({products}))
        },
        addProduct(product: ProductModel): void {
            patchState(store, currentState => ({ products: [...currentState.products, product] }));
        },
        updateProduct(product: ProductModel): void {
            patchState(store, currentState => ({products: currentState.products.map(p=> p.id === product.id ? product: p)}));
        },
        deleteProduct(id: number): void {
            patchState(store, currentState => ({products: currentState.products.filter(p=> p.id !==  id)}));
        },
        
    })),

    withComputed(store => ({
        count: computed(() => store.products().length),
        inStockProducts: computed(()=> store.products().filter(p=> p.stock > 0))
    })),

    environment.isDevelopment && withDevtools("ProductStore")
);