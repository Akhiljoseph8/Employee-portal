import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../employee/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  empCount:any=0
  constructor(private api:ApiService, private router:Router){
    this.getData()
  }
  getData(){
    this.api.getEmployee().subscribe({
      next:(res:any)=>{
        this.empCount= res.length
        console.log(this.empCount);
      },
    error:(err:any)=>{
      
    }
    })
  }
 logOut(){
  sessionStorage.removeItem('admin')
  this.router.navigateByUrl('')
 }
}
