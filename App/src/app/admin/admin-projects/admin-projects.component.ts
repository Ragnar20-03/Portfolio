import { Component } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.css'
})
export class AdminProjectsComponent {
  projects : any = []
  constructor(private pobj : ProjectService , private robj : Router)
  {

  }
  ngOnInit()
  {
    this.pobj.getAdminProjects().subscribe({
      next : res => {
            this.projects = res.projects;
      },  
      error : err => {
        console.log(err);
        
      }
    })
  }

  onView(id : any )
  {
    this.robj.navigate(['/admin/projects' , id])
  }
}
