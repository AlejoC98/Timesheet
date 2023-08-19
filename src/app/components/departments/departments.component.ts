import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/interfaces/department';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments!: Department[];

  constructor(
    private departmentsService: DepartmentsService,
  ) {}

  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
  }
}
