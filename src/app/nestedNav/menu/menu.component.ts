import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menuservice.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: any[] = [];
  constructor(
    private _menusService: MenusService
  ) { }

  ngOnInit() {
    this._menusService.getMenu().subscribe(data => {
      this.menus = this._menusService.buildFileTree(data);
    });

  }
}
