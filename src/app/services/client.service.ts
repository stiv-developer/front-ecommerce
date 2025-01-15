import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/client/list'

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
