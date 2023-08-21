import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/interfaces/department';
import { DepartmentsService } from 'src/app/services/departments.service';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  $departments: Observable<Department[]> | undefined;
  department: Department | undefined;
  employeeNameFc = new FormControl('', this.nameValidator());
  employees: Employee[] = [];
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$departments = this.departmentsService.getDepartments().pipe(
      map(departments => departments.map(item => ({
          id: Number(item.id),
          name: item.name
        }))
      )
    );
    
    this.$departments.pipe(
      switchMap(departments => {
        this.department = departments.find(dept => dept.id === Number(this.route.snapshot.params['id']))
        return this.employeeService.getEmployeeHoursByDepartment(this.department!.id);
      }),
      tap(employees => {
        this.employees = employees
      })
    ).subscribe();
  }

  addEmployee(): void {
    if (this.employeeNameFc.value) {

      this.employees.push({

        departmentId: this.department?.id,
        name: this.employeeNameFc.value,
        payRate: Math.floor(Math.random() * 50) + 50,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      });
    }

    this.employeeNameFc.setValue('');
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.employees && this.employees.length) {
        if (this.employees.find(employee => employee.name.toLowerCase() === control.value.toLowerCase()) !== undefined) {
          error = {duplicate: true};
        }
      }

      return error;
    }
  }

  deleteEmployee(employee: Employee, index: number): void {
    if (employee.id) {
      this.employeeService.deleteEmployeeHours(employee);
    }
    this.employees.splice(index, 1);
  }

  submit(): void {
    this.employees.forEach(employee => {
      if (employee.id) {
        this.employeeService.updateEmployeeHours(employee);
      } else {
        this.employeeService.saveEmployeeHours(employee);
      }
    });

    this.router.navigate(['./departments']);
  }
}
