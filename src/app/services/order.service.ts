import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private apiUrl = 'http://localhost:8080/orders'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/orders`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/orders/${orderId}`);
  }

  registerOrder(order: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/orders`,order);
  }

  deleteOrder(orderId: string): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/orders/${orderId}`);
  }

  updateOrder(orderId: string, order: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/orders/${orderId}`, order);
  }
}
