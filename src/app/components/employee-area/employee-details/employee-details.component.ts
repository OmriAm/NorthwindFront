import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeModel } from '../../../models/employee.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
    public employee: EmployeeModel;

    public constructor(
            private activatedRoute: ActivatedRoute, 
            private employeeService: EmployeeService,
            private notifyService: NotifyService 
        ) {}
    
        public async ngOnInit() {
            try {
                const id = +this.activatedRoute.snapshot.params["id"];
                this.employee = await this.employeeService.getOneEmployee(id);
            } catch (err: any) {
                this.notifyService.error(err.message);
            }
        }

}
