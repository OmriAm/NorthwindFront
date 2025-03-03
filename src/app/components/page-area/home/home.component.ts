import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    @ViewChild("lazyContainer", {read: ViewContainerRef})
    public viewContainerRef: ViewContainerRef;

    public async showSale(){
        this.viewContainerRef.clear();
    
        const { SaleComponent } = await import("../sale/sale.component")
        
        this.viewContainerRef.createComponent(SaleComponent);
    }


}
