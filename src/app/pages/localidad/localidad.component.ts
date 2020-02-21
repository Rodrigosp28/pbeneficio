import { Component, OnInit } from '@angular/core';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { mLocalidad } from 'src/app/models/localidad.model';
import { mPersona } from 'src/app/models/persona.model';
import { personaservice } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {FormGroup,FormControl,Validators} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.css']
})
export class LocalidadComponent implements OnInit {

  localidades: mLocalidad[] = [];
  personas: mPersona[] = [];
  localidad: mLocalidad = new mLocalidad();
  loading: boolean = false;
  idRol: string='null';
  forma: FormGroup;
  constructor(public catalogoservice: Catalogoservice,
              public personaservice: personaservice,
              public router:Router) {
    this.idRol = localStorage.getItem('rol');
    this.ObtenerLocalidades(); 
    this.forma = new FormGroup({
      'localid':new FormControl()
    });
    this.forma.controls['localid'].valueChanges.subscribe(data=>{
      // console.log(data);
      if(data===undefined) {return;}
      this.ObtenerPersonaPorLocalidad(data);

    });
   }

  ngOnInit() {
  }
  ObtenerLocalidades(){
    this.catalogoservice.GetLocalidades().subscribe((data: any) => {
    this.localidades = data.data;
    // console.log(this.localidades);
    });
  }

  verpersona(id: number){
    this.router.navigate(['log/persona',id]);
  }

  ObtenerPersonaPorLocalidad(id:number){
    this.loading = true;
    return this.personaservice.getPersonasByLocalidad(id).subscribe((data:any)=>{
      this.loading =false;
      this.personas =data.data;
    });
  }

  eliminarpersona(id: number){
    Swal.fire({
      title: 'espere',
      text: 'Eliminando Informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.personaservice.deletePersona(id).subscribe((data:any)=>{
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'Datos Eliminados',
          icon: 'success'
        });
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: data.messages,
          icon: 'error'
        });
      }
    });
  }

}
