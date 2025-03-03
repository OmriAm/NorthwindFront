import { Routes } from '@angular/router';
import { ContactUsComponent } from './components/page-area/contact-us/contact-us.component';
import { HomeComponent } from './components/page-area/home/home.component';
import { Page404Component } from './components/page-area/page-404/page-404.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-area/product-details/product-details.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { EmployeeListComponent } from './components/employee-area/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-area/employee-details/employee-details.component';
import { EditProductComponent } from './components/product-area/edit-product/edit-product.component';
import { AddProduct2Component } from './components/product-area/add-product2/add-product2.component';
import { AddEmployeeComponent } from './components/employee-area/add-employee/add-employee.component';
import { RegisterComponent } from './components/user-area/register/register.component';
import { LoginComponent } from './components/user-area/login/login.component';
import { TopThreeComponent } from './components/product-area/top-three/top-three.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [

    { path: "", redirectTo: "/home", pathMatch:"full" },
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductListComponent },
    { path: "top-three", component: TopThreeComponent, canActivate: [authGuard]},
    { path: "products/new", component: AddProduct2Component },
    { path: "products/:id", component: ProductDetailsComponent },
    { path: "products/edit/:id", component: EditProductComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "register", loadComponent : () =>  import("./components/user-area/register/register.component").then(m => m.RegisterComponent) },
    { path: "login", loadComponent : () => import("./components/user-area/login/login.component").then(m=> m.LoginComponent) },

    { path: "employees", component: EmployeeListComponent },
    { path: "employee-details/:id", component: EmployeeDetailsComponent },
    { path: "employees/new", component: AddEmployeeComponent },

    { path: "**", component: Page404Component }

];
