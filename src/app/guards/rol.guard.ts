import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  idRol: string;
  constructor(private router: Router){
    this.idRol= localStorage.getItem('rol');
  }
  canActivate(): boolean {
    if(this.idRol==='1'){
      // console.log('admin');
      return true;
    }
    if(this.idRol==='2'){
      alert('no es administrador');
      this.router.navigate(['log']);
      return false;
    }
    return false;
  }
  
}
