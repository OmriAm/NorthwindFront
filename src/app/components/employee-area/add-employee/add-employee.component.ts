import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';


@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
     public employeeForm: FormGroup;
        private employee = new EmployeeModel();
        
        public constructor(
            private employeeService: EmployeeService,
            private router:Router,
            private formBuilder: FormBuilder,
            private notifyService: NotifyService
        ) {
            
        }
        ngOnInit(): void {
            this.employeeForm = this.formBuilder.group({
                nameControl: new FormControl("", [Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
                priceControl: new FormControl("", [Validators.required, Validators.min(0),Validators.max(100)]),
                stockControl: new FormControl("", [Validators.required, Validators.min(0),Validators.max(100)]),
                imageControl: new FormControl("", [Validators.required])
            })
        }
    
        //   @ViewChild("productImage")
        //     public productImageRef: ElementRef<HTMLInputElement>;
    
        public async send(){
            try {
                // this.employee.name = this.productForm.get("nameControl").value;
                // this.product.price = this.productForm.get("priceControl").value;
                // this.product.stock = this.productForm.get("stockControl").value;
                // this.product.image = this.productImageRef.nativeElement.files[0];
                // await this.productService.addProduct(this.product);
                // this.notifyService.success("Product has been added.")
                // this.router.navigateByUrl("/products");
            } catch (err: any) {
                this.notifyService.error(err.message);
            }
            
        }
    
    
        public canceled = false;
        public dialogCanceled() {
            this.canceled = true;
        }
}
