import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { extraSpacing } from '../../../utils/validators';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-add-product2',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product2.component.html',
  styleUrl: './add-product2.component.css'
})
export class AddProduct2Component implements OnInit{
    public productForm: FormGroup;
    private product = new ProductModel();
    
    public constructor(
        private productService: ProductService,
        private router:Router,
        private formBuilder: FormBuilder,
        private notifyService: NotifyService
    ) {
        
    }
    ngOnInit(): void {
        this.productForm = this.formBuilder.group({
            nameControl: new FormControl("", [Validators.required, Validators.minLength(2),Validators.maxLength(30), extraSpacing()]),
            priceControl: new FormControl("", [Validators.required, Validators.min(0),Validators.max(100)]),
            stockControl: new FormControl("", [Validators.required, Validators.min(0),Validators.max(100)]),
            imageControl: new FormControl("", [Validators.required])
        })
    }

      @ViewChild("productImage")
        public productImageRef: ElementRef<HTMLInputElement>;

    public async send(){
        try {
            this.product.name = this.productForm.get("nameControl").value;
            this.product.price = this.productForm.get("priceControl").value;
            this.product.stock = this.productForm.get("stockControl").value;
            this.product.image = this.productImageRef.nativeElement.files[0];
            await this.productService.addProduct(this.product);
            this.notifyService.success("Product has been added.")
            this.router.navigateByUrl("/products");
        } catch (err: any) {
            this.notifyService.error(err.message);
        }
        
    }


    public canceled = false;
    public dialogCanceled() {
        this.canceled = true;
    }
}
