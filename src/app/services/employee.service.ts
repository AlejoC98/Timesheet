import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private db: AngularFirestore) { }

  saveEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').add(employee);
  }

  getEmployeeHoursByDepartment(departmentId: number): Observable<Employee[]> {
    const filteredEmployees = this.db.collection(
      'employee-hours', 
      ref => ref.where('departmentId', '==', departmentId)
    );

    return filteredEmployees.snapshotChanges().pipe(
      map((items: DocumentChangeAction<Employee>[]): Employee[] => {
        return items.map((item: DocumentChangeAction<Employee>): Employee => {
          return {
            id: item.payload.doc.id,
            departmentId,
            name: item.payload.doc.data().name,
            payRate: item.payload.doc.data().payRate,
            Monday: item.payload.doc.data().Monday,
            Tuesday: item.payload.doc.data().Tuesday,
            Wednesday: item.payload.doc.data().Wednesday,
            Thursday: item.payload.doc.data().Thursday,
            Friday: item.payload.doc.data().Friday,
            Saturday: item.payload.doc.data().Saturday,
            Sunday: item.payload.doc.data().Sunday,
          };
        });
      })
    );
  }

  updateEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').doc(employee.id).set(employee);
  }

  deleteEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').doc(employee.id).delete();
  }
}
