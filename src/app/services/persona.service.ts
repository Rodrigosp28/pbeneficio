import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mPersona } from '../models/persona.model';
import { mbp } from '../models/bp.model';

@Injectable({
  providedIn: 'root'
})
export class personaservice {
  url='http://localhost:8086'

  constructor(public http: HttpClient) {
  }

  PostPersona(persona: mPersona){
    const uri = `${this.url}/api/v0/Beneficios/Persona`;
    const body ={
      // idPersona: persona.idPersona,
      ClaveLector : persona.claveLector,
      nombre : persona.nombre,
      apellidoPat: persona.apellidoPat,
      apellidoMat: persona.apellidoMat,
      fechaNac: persona.fechanac,
      seccion: persona.seccion,
      direccion: persona.direccion,
      idUser: persona.idUser,
      idLocalidad: persona.idLocalidad
    };
    return this.http.post(uri,body);
  }
  getPersonas(){
    const uri = `${this.url}/api/v0/Beneficios/Persona`;
    return this.http.get(uri);
  }

  getPersonasByLocalidad(id:number){
    const uri = `${this.url}/api/v0/Beneficios/Persona`;
    return this.http.get(`${uri}/${id}/ByLocalidad`);
  }

  deletePersona(id: number){
    const uri = `${this.url}/api/v0/Beneficios/Persona`;
    return this.http.delete(`${uri}/${id}`);
  }

  getPersonaPorId(id: number){
    const uri = `${this.url}/api/v0/Beneficios/Persona`;
    return this.http.get(`${uri}/${id}`);
    
  }

  getBeneficioPorPersona(id:number){
    const uri = `${this.url}/api/v0/Beneficios/BeneficioPersona`;
    return this.http.get(`${uri}/${id}`);
  }

  getBeneficioPorBeneficio(id: number) {
    const uri = `${this.url}/api/v0/Beneficios/BeneficioPersona`;
    return this.http.get(`${uri}/${id}/ByBeneficio`);
  }

  insertarBeneficioPersona(bp:mbp){
    const uri = `${this.url}/api/v0/Beneficios/BeneficioPersona`;
    const body ={
      idBP: bp.idBP,
      idPersona: bp.idPersona,
      idBeneficio: bp.idBeneficio,
      Descripcion:bp.descripcion,
      fecha: bp.fecha,
      idUser: bp.idUser
    };
    return this.http.post(uri,body);
  }

  BuscarPersonaPorNombre(nombre: string){
    const uri =`${this.url}/api/v0/Beneficios/BeneficioPersona`;
    return this.http.get(`${uri}/${nombre}/SearchNombre`);
  }

  BuscarPersonaPorClave(clave: string){
    const uri =`${this.url}/api/v0/Beneficios/BeneficioPersona`;
    return this.http.get(`${uri}/${clave}/SearchClave`);
  }
}