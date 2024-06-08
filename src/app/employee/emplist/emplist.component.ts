import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {
 cdate:any=new Date()
 employees:any=[]
 searchKey:string=""
 constructor(private api:ApiService,private toastr:ToastrService){}
  
 ngOnInit(): void {
     this.api.getEmployee().subscribe({
      next:(res:any)=>{
        this.getData(res)
      },
      error:(err:any)=>{

      }
     })
 }
 getData(emp:any){
  this.employees=emp
  console.log(this.employees)
 }

 sortById(){
  this.employees.sort((item1:any,item2:any)=>
    item1.id-item2.id
  )
 }

 sortUsername(){
  this.employees.sort((a:any,b:any)=>a.username.localeCompare( b.username))
}
 

generatePdf(){
  const doc =new jsPDF()
  const body:any=this.employees.map((item:any)=>{
    const res:any=[]
    res.push(item.id)
    res.push(item.username)
    res.push(item.email)
    res.push(item.status)
    return res
  })
  autoTable(doc,{
    head:[['ID','Username','email','Status']],
    body
  })
  doc.save('table.pdf')
}

deleteEmployee(id:any){
  this.api.deleteEmployee(id).subscribe({
    next:(res:any)=>{
      this.toastr.success("Deleted successfully")
      this.ngOnInit()
    },
    error:(err:any)=>{
      this.toastr.error(err)
    }
  })
}

}
