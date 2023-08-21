import { Injectable } from '@angular/core';
import { Department } from '../interfaces/department';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) {}

  departments: Department[] = [];

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`https://hr-timesheet-test.firebaseio.com/departments.json`);
    // return this.http.get<Department[]>(`https://hr-timesheet-test.firebaseio.com/departments.json`).pipe(
    //   map(departments => departments.map(item => ({
    //     id: Number(item.id),
    //     name: item.name
    //   })))
    // );
  }

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(department => department.id === id);
  }
}
