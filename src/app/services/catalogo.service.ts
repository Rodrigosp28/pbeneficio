import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { mLocalidad } from '../models/localidad.model';
import { mArea } from '../models/area.model';
import { mCargo } from '../models/cargo.model';
import { mRol } from '../models/rol.model';
import { beneficio } from '../models/beneficio.model';

@Injectable({
  providedIn: 'root'
})
export class Catalogoservice {
  url='http://200.94.87.148:60102'
  constructor(public http: HttpClient){
    
  }

  GetLocalidades(){
    const uri = `${this.url}/api/v0/Beneficios/Localidad`;
    return this.http.get(uri); 
  }
  
  GetAreas(){
    const uri = `${this.url}/api/v0/Beneficios/Area`;
    return this.http.get(uri);
  }

  GetCargos(){
    const uri = `${this.url}/api/v0/Beneficios/Cargo`;
    return this.http.get(uri);
  }

  GetRoles(){
    const uri = `${this.url}/api/v0/Beneficios/Roles`;
    return this.http.get(uri);
  }

  GetBeneficios(){
    const uri = `${this.url}/api/v0/Beneficios/Beneficio`;
    return this.http.get(uri);
  }

  PostLocalidades(locali: mLocalidad){
    const uri = `${this.url}/api/v0/Beneficios/Localidad`;
    const body ={
      idLocalidad:locali.idLocalidad,
      nombre:locali.nombre
    };
    return this.http.post(uri, body);
  }

  PostArea(area: mArea){
    const uri = `${this.url}/api/v0/Beneficios/Area`;
    const  body ={
      idArea : area.idArea,
      nombre :area.nombre
    };
    return this.http.post(uri,body);
  }

  PostCargo(cargo: mCargo){
    const uri = `${this.url}/api/v0/Beneficios/Cargo`;
    const body = {
      idCargo: cargo.idCargo,
      idArea: cargo.idArea,
      Descripcion : cargo.descripcion
    };
    return this.http.post(uri, body);
  }

  PostRol(rol: mRol){
    const uri = `${this.url}/api/v0/Beneficios/Roles`;
    const body = {
      idRol : rol.idRol,
      descripcion: rol.descripcion
    };
    return this.http.post(uri, body);
  }
  PostBeneficio(bene: beneficio){
    const uri = `${this.url}/api/v0/Beneficios/Beneficio`;
    const body = {
      idBeneficio: bene.idBeneficio,
      idArea : bene.idArea,
      nombre: bene.nombre
    };
    return this.http.post(uri, body);
  }

  DeleteLocalidades(id: number){
    const uri = `${this.url}/api/v0/Beneficios/Localidad`;
    return this.http.delete(`${uri}/${id}`);
  }

  DeleteArea(id: number) {
    const uri = `${this.url}/api/v0/Beneficios/Area`;
    return this.http.delete(`${uri}/${id}`);
  }

  DeleteCargo(id: number) {
    const uri = `${this.url}/api/v0/Beneficios/Cargo`;
    return this.http.delete(`${uri}/${id}`);
  }
  deteteRol(id: number) {
    const uri = `${this.url}/api/v0/Beneficios/Roles`;
    return this.http.delete(`${uri}/${id}`);
  }
  deleteBeneficio(id: number) {
    const uri = `${this.url}/api/v0/Beneficios/Beneficio`;
    return this.http.delete(`${uri}/${id}`);
  }
}
