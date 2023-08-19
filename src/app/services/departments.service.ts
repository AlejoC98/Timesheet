import { Injectable } from '@angular/core';
import { Department } from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  departments: Department[] = [
    {id: 1, name: 'Customer Success'},
    {id: 2, name: 'Sales'},
    {id: 3, name: 'Finance'},
  ];

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(department => department.id === id);
  }
}
