import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Department } from 'src/app/interfaces/department';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  $departments: Observable<Department[]> | undefined;

  constructor(
    private departmentsService: DepartmentsService,
  ) {}

  ngOnInit(): void {
    this.$departments = this.departmentsService.getDepartments().pipe(
      map(departments => departments.map(item => ({
          id: Number(item.id),
          name: item.name
        }))
      )
    );
  }
}
