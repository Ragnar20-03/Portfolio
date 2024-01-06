import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(public hobj : HttpClient) { }

  getProjects()
  {
    return this.hobj.get<any>("http://localhost:5100/user/projects");
  }
  getProjectById(id : any)
  {
    return this.hobj.get<any>(`http://localhost:5100/user/projects/${id}`);
  }


  getAdminProjects()
  {
    return this.hobj.get<any>("http://localhost:5100/admin/projects");
  }
  getAdminProjectById(id : any)
  {
    return this.hobj.get<any>(`http://localhost:5100/admin/projects/${id}`);
  }

  updateAdminProject(id : any , updatedData : any)
  {
    return this.hobj.post<any>(`http://localhost:5100/admin/updateProjects/${id}` , updatedData);
  }
  addAdminProject(newProject : any)
  {
    return this.hobj.post<any>(`http://localhost:5100/admin/projects/` , newProject);

  }

}
