import { Injectable } from '@angular/core';
import { Menuitems } from 'src/app/interfaces/menuitems';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuItemsList: Menuitems[] = [
    {
      id: 1,
      name: 'Departments',
      link: '/departments',
      icon: 'ballot'
    },
    // {
    //   id: 2,
    //   name: 'Timesheet',
    //   link: '/timesheet',
    //   icon: 'more_time'
    // },
    {
      id: 3,
      name: 'Analytics',
      link: '/analytics',
      icon: 'analytics'
    },
  ];

  activeButton: HTMLButtonElement | null = null;

  togglePage(button: HTMLButtonElement | null): void {
    if (this.activeButton !== button) {
      button!.classList.remove('active');
    }

    if (this.activeButton !== button) {
      button!.classList.add('active');
      this.activeButton = button;
    }
  }

  constructor() {}
}
