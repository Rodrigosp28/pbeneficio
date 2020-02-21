import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Loginservice } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginserv: Loginservice, private router: Router) {}
  canActivate(): boolean {
    if( !this.loginserv.logueado()){
      // console.log('no esta logueado');
      alert('No Se Encuentra Inicio De Sesion');
      this.router.navigate(['login']);
      return false;
    }
    // console.log('log');
    return true;
  }
  
}
