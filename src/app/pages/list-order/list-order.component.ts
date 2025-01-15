import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit{

  orders: any[] = [];

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders', error)
      }
    )
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (response) => {
        console.log('Order deleted successfully', response);
        this.orders = this.orders.filter(order => order.id !== orderId);
      },
      (error) => {
        console.error('Error deleting order', error);
      }
    );
  }

}
