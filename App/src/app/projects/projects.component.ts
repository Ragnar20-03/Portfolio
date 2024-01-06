import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects : any = []
  constructor(private pobj : ProjectService , private robj : Router)
  {

  }
  ngOnInit()
  {
    this.pobj.getProjects().subscribe({
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
    this.robj.navigate(['/projects' , id])
  }
}
