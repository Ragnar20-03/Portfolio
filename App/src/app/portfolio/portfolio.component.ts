import { Component, OnInit } from '@angular/core';
import { PortfolioServiceService } from '../portfolio-service.service';
import { Observable } from 'rxjs';

interface Projects{
  name : string;
  description : string;
  link : string;
  img : string
};

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  providers : [PortfolioServiceService]
})

export class PortfolioComponent implements OnInit
{
  project : any = [];
  
  constructor(private _port : PortfolioServiceService) {}

  ngOnInit(): void {
      this._port.get_projects_http().subscribe({
        next : res => {
          console.log(res);
          this.project = res.Projects;
        },
        error : err => {
          console.log(err)
        }
      })
    }
}  