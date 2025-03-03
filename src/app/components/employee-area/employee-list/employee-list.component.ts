import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

     public employees: EmployeeModel [] = [];

      public constructor(private employeeService: EmployeeService,
             private router: Router,
             private notifyService: NotifyService
         ) { } // DI
     
         public async ngOnInit() {
             try {
                 this.employees = await this.employeeService.getAllEmployees();
                 console.log(this.employees);
             }
             catch(err: any) {
                 this.notifyService.error(err.message);
             }
         }
         public displayDetails(id: number){
             this.router.navigateByUrl("/employee-details/" + id);
         }


}
