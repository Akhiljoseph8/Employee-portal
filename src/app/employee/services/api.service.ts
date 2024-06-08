import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  server_url:string="https://emp-json-server-1.onrender.com"

  constructor(private http:HttpClient) { }
  addEmployee(data:any){
    return this.http.post(`${this.server_url}/employees`,data)
  }
  getEmployee(){
    return this.http.get(`${this.server_url}/employees`)
  }
  getSpecificEmployee(id:any){
    return this.http.get(`${this.server_url}/employees/${id}`)
  }
  editEmployee(id:any,data:any){
    return this.http.put(`${this.server_url}/employees/${id}`,data)
  }
  deleteEmployee(id:any){
    return this.http.delete(`${this.server_url}/employees/${id}`)
   }
}

