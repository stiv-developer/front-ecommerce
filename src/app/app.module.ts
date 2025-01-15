import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './pages/order/order.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateOrderComponent } from './pages/update-order/update-order.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ListOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
