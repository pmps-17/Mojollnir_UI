import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VendorApiService {

  private apiUrl = environment.vendorUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/endpoint`)
  }

  postData(data: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data,  { headers })
  }
}
