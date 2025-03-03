import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ProductStore } from '../storage/product-store';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private http = inject(HttpClient);
    private productStore  = inject(ProductStore);

    public async getAllProducts(): Promise<ProductModel[]> {

        if (this.productStore.count() > 0) return this.productStore.products();
        const products$ = this.http.get<ProductModel[]>(environment.productsUrl); // Returns observable
        const products = await firstValueFrom(products$);

        this.productStore.initProducts(products);

        return products;
    }


    public async getOneProduct(id: number): Promise<ProductModel>{
        const dbProduct = this.productStore.products().find(p=> p.id === id);
        if (dbProduct) return dbProduct;
        const product$ = this.http.get<ProductModel>(environment.productsUrl + id);
        const product = await firstValueFrom(product$);
        return product;
    }

    public async addProduct(product: ProductModel): Promise<void>{
        const dbProduct$ = this.http.post<ProductModel>(environment.productsUrl, ProductModel.toFormData(product));
        // const dbProduct$ = this.http.post<ProductModel>(environment.productsUrl, product.toFormData());

        const dbProduct = await firstValueFrom(dbProduct$);
        this.productStore.addProduct(dbProduct);
    }

    public async updateProduct(product: ProductModel): Promise<void>{
        const dbProduct$ = this.http.put<ProductModel>(environment.productsUrl  + product.id, ProductModel.toFormData(product));
        // const dbProduct$ = this.http.put<ProductModel>(environment.productsUrl + product.id , product.toFormData());

        const dbProduct = await firstValueFrom(dbProduct$);
        this.productStore.updateProduct(dbProduct);
    }

    public async deleteProduct(id: number): Promise<void>{
        const observable$ = this.http.delete<ProductModel>(environment.productsUrl  + id);
        
       await firstValueFrom(observable$);

        this.productStore.deleteProduct(id);
    }

    public async getTop3Products(): Promise<ProductModel[]> {
        // const token = localStorage.getItem("token");
        // const headers = new HttpHeaders().set("authorization","Bearer " + token);
        
        // const products$ = this.http.get<ProductModel[]>(environment.topThreeProductsUrl, {headers}); // Returns observable
        const products$ = this.http.get<ProductModel[]>(environment.topThreeProductsUrl); // Returns observable
        const products = await firstValueFrom(products$);
        return products;
    }

}
