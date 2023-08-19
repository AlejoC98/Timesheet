import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
// import { Menuitems } from 'src/app/interfaces/menuitems';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  constructor (public menuService: MenuService) {}
}
