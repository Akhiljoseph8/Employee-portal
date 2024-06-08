import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { EmployeeSchema } from '../schemas/employeeSchema';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})
export class EditempComponent implements OnInit {
 empId:any=""
 constructor(private ar:ActivatedRoute,private api:ApiService,private toastr:ToastrService,private router:Router){
  this.ar.params.subscribe((res:any)=>{
    this.empId=res.id
  })
  console.log(this.empId)
 }
 emp:EmployeeSchema={}
 ngOnInit(): void {
  this.api.getSpecificEmployee(this.empId).subscribe({
   next:(res:any)=>{
   console.log(res)
   this.getEmployeeDetails(res)
   },
   error:(err:any)=>{
    console.log(err)
   }
  })
}
getEmployeeDetails(data:any){
  this.emp.id=data.id
  this.emp.username=data.username
  this.emp.email=data.email
  this.emp.status=data.status
  console.log("emp",this.emp)
 }
 handleSubmit(){
 this.api.editEmployee(this.empId,this.emp).subscribe({
  next:(res:any)=>{
    this.toastr.success("Employee Updated")
    this.router.navigateByUrl("employee")
  },
  error:(err:any)=>{
    this.toastr.error("Failed")
  }
 })
 }

 onCancel(){
  this.router.navigateByUrl('employee')
}

}
