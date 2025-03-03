import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[] = [];

    public constructor(private productService: ProductService,
        private router: Router,
        private notifyService: NotifyService
    ) { } // DI

    public async ngOnInit() {
        try {
            this.products = await this.productService.getAllProducts();
            console.log(this.products);
        }
        catch(err: any) {
            this.notifyService.error(err.message);
        }
    }
    public displayDetails(id: number){
        this.router.navigateByUrl("/products/" + id);
    }


}
