import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/orders'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  registerOrder(order: any): Observable<any>{
    return this.http.post<any>(this.apiUrl,order);
  }

  deleteOrder(orderId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }

  updateOrder(orderId: string, order: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, order);
  }
}
