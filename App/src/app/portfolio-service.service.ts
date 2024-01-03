import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Projects{
  name : string;
  description : string;
  link : string;
  img : string
};

@Injectable({
  providedIn: 'root'
})

export class PortfolioServiceService {

  constructor(private _http : HttpClient){ }

  get_projects_http()
  {
    return this._http.get<any>("http://localhost:5100/api/projects")
  }
}
