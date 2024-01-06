import { Component } from '@angular/core';
import { ProjectService } from '../../project.service';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  newProject : any = {
    projectName : "",
    desc : "",
    imageLink : "",
    liveLink:"" ,
    srcLink:"",
  }
  constructor(private pobj : ProjectService ){}

  onNewProject()
  {
    console.log(this.newProject);
    
    this.pobj.addAdminProject(this.newProject).subscribe({
      next : res =>{

      },
      error : err =>{

      }
    })
  }
}
