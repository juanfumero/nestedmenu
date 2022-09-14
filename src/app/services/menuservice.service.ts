import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItemNode } from '../nestedNav/item/item.component';
@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http: HttpClient) {
  }


  getMenu(): Observable<any> {
   return this.http.get<any>('http://localhost:3000/nestedMenu');
  }

  buildFileTree(items: any[]): TodoItemNode[] {
    return items.map( item1 => {
      let subMenuItem: any = [];
      let node:any;

      node = new TodoItemNode();
      node.name = item1.name;
      node.type = 'button';
      node.expand = false;
      if( item1.parentId === null) {
        node.subMenu = [];
      } else {

        const busqueda = items.filter((valor) => {
          if( valor.parentId === item1.id) {
            return valor;
          }
        });
        /*items.map( item2 => {

          if(item1.parentId === item2.id) {
            subMenuItem.push(item2);
          }
        }) */
        node.subMenu = this.buildFileTree(busqueda);
      }

      return node;
    });
  }

}

