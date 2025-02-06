import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/order`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/order/${orderId}`);
  }

  registerOrder(order: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/order`,order);
  }

  deleteOrder(orderId: string): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/order/${orderId}`);
  }

  updateOrder(orderId: string, order: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/order/${orderId}`, order);
  }
}
