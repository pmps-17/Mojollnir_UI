import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://vendor-zoo.coffeecodes.in/v1/vendor/';

  GetAll(){
    return  this.http.get(this.apiUrl);
  }

  GetbyCode(inputdata:any){
    return  this.http.post(this.apiUrl + 'login', inputdata);
  }

  GetOtp(inputdata:any){
    return  this.http.post(this.apiUrl + 'verify_otp', inputdata);
  }

  Proceedregister(inputdata: any, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(this.apiUrl + 'register', inputdata, { headers });
  }

  // Proceedregister(inputdata:any){
  //   return this.http.post(this.apiUrl + 'register', inputdata);
  // }

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
