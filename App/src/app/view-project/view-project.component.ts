import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent {
  project : any = {}
  constructor(private  pobj : ProjectService , private arobj : ActivatedRoute)
  {

  }

  ngOnInit()
  {
    this.arobj.paramMap.subscribe({
      next : res => {
        let id : any  = res.get('id')
        this.pobj.getProjectById(id).subscribe({
          next : res => {
            console.log(res);
            this.project = res.project
          }
        })
      }
    })
  }
} 
