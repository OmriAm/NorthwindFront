import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


    private http = inject(HttpClient);

    public async getAllEmployees(): Promise<EmployeeModel[]> {
            const employees$ = this.http.get<EmployeeModel[]>(environment.employeeUrl); // Returns observable
            const employees = await firstValueFrom(employees$);
            return employees;
        }

        public async getOneEmployee(id: number): Promise<EmployeeModel>{
                const employees$ = this.http.get<EmployeeModel>(environment.employeeUrl + id);
                const employee = await firstValueFrom(employees$);
                return employee;
            }
    
    
}
