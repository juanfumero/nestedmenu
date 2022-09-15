import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItemNode } from '../nestedNav/item/item.component';


@Injectable({
  providedIn: 'root'
})
export class MenusService {

  public treeNodes: TodoItemNode[] = [];

  constructor(private http: HttpClient) {
  }


  getMenu(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/nestedMenu');
  }

  buildFileTree(items: any[]): TodoItemNode[] {

    let treeMenuResponses: TodoItemNode[] = [];
    items.map((item1) => {
      let node: any;
      node = new TodoItemNode();
      node.name = item1.name;
      node.id = item1.id;
      node.parentId = item1.parentId;
      node.type = 'button';
      node.expand = false;
      treeMenuResponses.push(node)
    });

    this.treeNodes = this.nodesConcat(treeMenuResponses);

    return this.treeNodes;
  }

  nodesConcat(items: any[], id = null, link = 'parentId'): any[] {
    return items
      .filter(item => item[link] === id)
      .map(item => ({ ...item, subMenu: this.nodesConcat(items, item.id) }));
  }

}

