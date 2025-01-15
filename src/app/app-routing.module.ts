import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { OrderComponent } from './pages/order/order.component';
import { UpdateOrderComponent } from './pages/update-order/update-order.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrderComponent,
  },
  {
    path: 'newOrder',
    component: OrderComponent
  },
  {
    path: 'updateOrder/:id',
    component: UpdateOrderComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
