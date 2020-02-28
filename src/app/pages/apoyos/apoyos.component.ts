import { Component, OnInit } from '@angular/core';
import { beneficio } from 'src/app/models/beneficio.model';
import { mPersona } from 'src/app/models/persona.model';
import { FormGroup, FormControl } from '@angular/forms';
import { personaservice } from 'src/app/services/persona.service';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apoyos',
  templateUrl: './apoyos.component.html',
  styleUrls: ['./apoyos.component.css']
})
export class ApoyosComponent implements OnInit {
  apoyos: beneficio[]= [];
  personas: mPersona[] = [];
  loading: boolean = false;
  idRol: string='null';
  forma: FormGroup;
  idApoyo:number;
  constructor(private _personaService:personaservice,
              private _catalogosService: Catalogoservice,
              private router: Router) { 
      this.idRol = localStorage.getItem('rol');
      this.obtenerApoyos();
      this.formulario();          
    }

  ngOnInit() {
  }

  obtenerApoyos() {
    return this._catalogosService.GetBeneficios().subscribe((data: any)=>{
      this.apoyos=data.data;
    });
  }

  formulario() {
    this.forma = new FormGroup({
      'fapoyo':new FormControl()
    });
    this.forma.controls['fapoyo'].valueChanges.subscribe(data=>{
      // console.log(data);
      if(data===undefined) {return;}
      this.ObtenerPersonaPorApoyo(data);

    });
  }

  verpersona(id: number){
    this.router.navigate(['log/persona',id]);
  }

  eliminarpersona(id: number){
    Swal.fire({
      title: 'espere',
      text: 'Eliminando Informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this._personaService.deletePersona(id).subscribe((data:any)=>{
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

  ObtenerPersonaPorApoyo(id:number){
    this.loading = true;
    return this._personaService.getPersonasByApoyo(id).subscribe((data:any)=>{
      this.loading =false;
      this.personas =data.data;
    });
  }

}
