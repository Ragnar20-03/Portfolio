import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptorsService } from './admin/token-interceptors.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) , provideHttpClient(withInterceptorsFromDi()) , 
  {provide : HTTP_INTERCEPTORS , useClass : TokenInterceptorsService , multi : true}]
};
