import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { ViewAdminProjectComponent } from './admin/view-admin-project/view-admin-project.component';
import { UpdateProjectComponent } from './admin/update-project/update-project.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';


export const routes: Routes = [
    {
        path : "" , component : ProjectsComponent
    },
    {
        path:"projects" , component:ProjectsComponent
    },
    {
        path:"projects/:id" , component:ViewProjectComponent
    },
    {
        path : "admin/projects" , component : AdminProjectsComponent
    } ,
     {
        path : "admin/projects/:id" , component : ViewAdminProjectComponent
    },
    {
        path : "admin/updateProject/:id" , component : UpdateProjectComponent
    },
    {
        path : "admin/addProject" , component : AddProjectComponent
    },
    {
        path : "**" , component : ProjectsComponent
    }
];
