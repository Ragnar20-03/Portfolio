import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
    {path : 'home-component', component: HomeComponent},
    {path : 'about-component', component : AboutComponent},
    {path : 'portfolio-component', component : PortfolioComponent},
    {path : 'resume-component', component : ResumeComponent}
];
