import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenusService } from '../../services/menuservice.service';
import { BehaviorSubject } from 'rxjs';


export class TodoItemNode {
  id: string = '';
  subMenu: TodoItemNode[] = [];
  name: string = '';
  expand: boolean = false;
  isSelected: boolean = true;
  type: 'button' | 'label' | 'button' = 'button';
}



@Component({
  selector: 'nav-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('inOut', [
      state('out', style({ opacity: 0, height: 0 })),
      transition('void => *', [
        style({ opacity: 0, height: 0 }),
        animate(150, style({ opacity: 1, height: '*' }))
      ]),
      transition('* => void', [
        style({ opacity: 1, height: '*' }),
        animate(150, style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class ItemComponent implements OnInit {
startExpand: any[] = [];
targetUrl = "";
source: any[] = [];
sourceItem = "";
@Input() menu: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _MenusService: MenusService
  ) { }
ngOnInit() {
  this._MenusService.getMenu().subscribe(data => {
    //this.source = data;
    this.source = this._MenusService.buildFileTree(data);
    this.setCurrentMenu();
  });
}




setCurrentMenu() {
  this.setExpand(this.source);
}

setExpand(source: any) {
  for (var i = 0; i < source.length; i++) {
    this.sourceItem = JSON.stringify(source[i]);
      if (source[i].type === 'button') {
        this.startExpand.push(source[i]);
        source[i].isSelected = true;
        source[i].expand = true;
        this.setExpand(source[i].subMenu);
      }
      break;
  }
}

toggleSubMenu(menuItem: any) {
  if (menuItem.type === 'link') {
    if (this.startExpand.length > 0) {
      for (var i = 0; i < this.startExpand.length; i++) {
        delete this.startExpand[i].isSelected;
      }
    }
    this.targetUrl = menuItem.url;
    this.setExpand(this.source);
    this.startExpand = [];
  }
  menuItem.expand = !menuItem.expand;
}
}


