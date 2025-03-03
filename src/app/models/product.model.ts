export class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string;
    public image: File; // Image to send to back.

    public static toFormData(product: ProductModel): FormData{
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("image", product.image);
        return formData;
    }



    // public toFormData(): FormData{
    //     const formData = new FormData();
    //     formData.append("name", this.name);
    //     formData.append("price", this.price.toString());
    //     formData.append("stock", this.stock.toString());
    //     formData.append("image", this.image);
    //     return formData;
    // }

 }
