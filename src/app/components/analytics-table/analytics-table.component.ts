import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-analytics-table',
  templateUrl: './analytics-table.component.html',
  styleUrls: ['./analytics-table.component.scss']
})
export class AnalyticsTableComponent implements OnInit {
  @Input()
  departmentId: number | undefined;

  employees: Employee[] = [];
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  employeeData: Employee[] = [
      {
          id: '1',
          departmentId: 1,
          name: 'a',
          payRate: 70,
          Monday: 4,
          Tuesday: 3,
          Wednesday: 4,
          Thursday: 5,
          Friday: 6,
          Saturday: 7,
          Sunday: 6,
      },
      {
          id: '2',
          departmentId: 1,
          name: 'b',
          payRate: 63,
          Monday: 4,
          Tuesday: 3,
          Wednesday: 4,
          Thursday: 3,
          Friday: 2,
          Saturday: 1,
          Sunday: 2,
      },
      {
          id: '3',
          departmentId: 2,
          name: 'c',
          payRate: 76,
          Monday: 8,
          Tuesday: 7,
          Wednesday: 5,
          Thursday: 4,
          Friday: 9,
          Saturday: 7,
          Sunday: 5,
      },
      {
          id: '4',
          departmentId: 3,
          name: 'd',
          payRate: 56,
          Monday: 3,
          Tuesday: 4,
          Wednesday: 5,
          Thursday: 0,
          Friday: 2,
          Saturday: 3,
          Sunday: 2,
      }
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.employees = this.employeeData.filter(e => e.departmentId === this.departmentId);
    this.employeeService.getEmployeeHoursByDepartment(this.departmentId!).subscribe((employees: Employee[]) => {
      this.employees = employees;
    })
  }

  getTotalHours(employee: Employee): number {
    return employee.Monday + employee.Tuesday + employee.Wednesday
        + employee.Thursday + employee.Friday + employee.Saturday + employee.Sunday;
  }
}