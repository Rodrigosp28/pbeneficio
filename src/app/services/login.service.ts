import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { mUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {
  private url=`${environment.APIEndpoint}/token`;
  userToken: string;
  userId: string;
  rolId: string;

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logueado(): boolean {
    if(this.userToken.length < 2){return false; }
    else {return true}
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
  }

  guardartoken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', this.userToken);
  }

  guardaruser(userid: string){
    this.userId = userid;
    localStorage.setItem('user', this.userId);
  }

  leerToken() {
    if ( localStorage.getItem('token') ) { 
      this.userToken = localStorage.getItem('token');
    }
    else { 
        this.userToken = '';
    }
    return this.userToken;
  }

  guardarRol(id:string){
    this.rolId = id;
    localStorage.setItem('rol', this.rolId);
  }

  login(user: string,pass:string) {

     const datos=`grant_type=password&
     username=${user}&
     password=${pass}`;
     const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
     });

     return this.http.post(this.url, datos).pipe(map(resp => {
       this.guardartoken(resp['access_token']);
       this.guardaruser(resp['usertypeid']);
       this.guardarRol(resp['rol']);
       return resp;
     }));
  }

  ObtenerUsuarioPorId(id: string){
    const uri = `${environment.APIEndpoint}/api/v0/Beneficios/Usuario`;
    return this.http.get(`${uri}/${id}/ById`);
  }

  ObtenerUsuarios() {
    const uri = `${environment.APIEndpoint}/api/v0/Beneficios/Usuario`;
    return this.http.get(uri);
  }

  activarUsuario(id:number,act: boolean) {
    const uri = `${environment.APIEndpoint}/api/v0/Beneficios/Usuario/activar/${id}/${act}`;
    return this.http.get(uri);
  }

  insertarUsuario(usuario: mUsuario) {
    // console.log(usuario);
    const uri = `${environment.APIEndpoint}/api/v0/Beneficios/Usuario`;
    const body = {
      // idUser: 1,
      usuario: usuario.usuario,
      password: usuario.password,
      nombre: usuario.nombre,
      apePat: usuario.apePat,
      apeMat: usuario.apeMat,
      fechaNac: usuario.fechaNac,
      direccion: usuario.direccion,
      ciudad: usuario.ciudad,
      idCargo: usuario.idCargo,
      idRol: usuario.idRol,
      activo: usuario.activo
    }
    return this.http.post(uri,body);

  }

  eliminarUsuario(id: number) {
    const uri = `${environment.APIEndpoint}/api/v0/Beneficios/Usuario/${id}`;
    return this.http.delete(uri);
  }


}