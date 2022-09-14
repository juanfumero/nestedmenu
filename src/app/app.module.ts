import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideComponent } from './nestedNav/side/side.componente';
import { MenuComponent } from './nestedNav/menu/menu.component';
import { ItemComponent } from './nestedNav/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { MenusService } from './services/menuservice.service';

@NgModule({
  declarations: [
    AppComponent,
    SideComponent,
    MenuComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MenusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
