import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/user';

  GetAll(){
    return  this.http.get(this.apiUrl);
  }

  GetbyCode(code:any){
    return  this.http.get(this.apiUrl + '?id=' + code);
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.apiUrl, inputdata);
  }

  UpdateUser(code:any, inputdata:any){
    return this.http.post(this.apiUrl + '/' + code, inputdata);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  
  GetUserRole(){
    return sessionStorage.getItem('role')!=null ? sessionStorage.getItem('role')?.toString():'';
  }

  getAllRole(){
    return this.http.get('http://localhost:3000/role')
  }

  getRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

}
