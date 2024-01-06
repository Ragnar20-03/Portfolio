import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-view-admin-project',
  standalone: true,
  imports: [NgFor],
  templateUrl: './view-admin-project.component.html',
  styleUrl: './view-admin-project.component.css'
})
export class ViewAdminProjectComponent implements OnInit {
  project : any = {}
constructor(public robj: ActivatedRoute , public router : Router, public pobj : ProjectService)
{

}

ngOnInit()
{
  this.robj.paramMap.subscribe({
    next : res => {
      let id = res.get('id')
     this.pobj.getProjectById(id).subscribe({
      next :res => {
        console.log(res);
        this.project = res.project
      }
     })
    },
    error : err=> {
      console.log(err);
      
    }
  })
}
onUpdate(id : any)
{
  console.log("ONADSD : " , id);
  
  this.router.navigate(['/admin/updateProject' , id] )
}
}
