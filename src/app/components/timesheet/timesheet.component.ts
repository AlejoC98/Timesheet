import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/interfaces/department';
import { DepartmentsService } from 'src/app/services/departments.service';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  departments: Department[] | undefined;
  department: Department | undefined;
  employeeNameFc = new FormControl('', this.nameValidator());
  employees: Employee[] = [];
  employeeId = 0;

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
  ) {}

  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(
      department => department.id === Number(this.route.snapshot.params['id'])
    );
  }

  addEmployee(): void {
    if (this.employeeNameFc.value) {
      this.employeeId++;

      this.employees.push({
        id: this.employeeId,
        departmentId: this.department?.id,
        name: this.employeeNameFc.value,
        payRate: Math.floor(Math.random() * 50) + 50,
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
}
