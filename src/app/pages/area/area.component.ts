import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { mArea } from 'src/app/models/area.model';
import { mPersona } from 'src/app/models/persona.model';
import { personaservice } from 'src/app/services/persona.service';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  areas: mArea[]= [];
  personas: mPersona[] = [];
  loading: boolean = false;
  idRol: string='null';
  forma: FormGroup;
  idArea:number;
  constructor(private _personaService:personaservice,
              private _catalogosService: Catalogoservice,
              private router: Router) { 
    this.idRol = localStorage.getItem('rol');
    this.obtenerAreas();
    this.formulario();
  }

  ngOnInit() {
  }

  obtenerAreas() {
    return this._catalogosService.GetAreas().subscribe((data: any) => {
      this.areas=data.data;
      // console.log(this.areas);
    })
  }
  
  formulario() {
    this.forma = new FormGroup({
      'farea':new FormControl()
    });
    this.forma.controls['farea'].valueChanges.subscribe(data=>{
      // console.log(data);
      if(data===undefined) {return;}
      this.ObtenerPersonaPorArea(data);

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

  ObtenerPersonaPorArea(id:number){
    this.loading = true;
    return this._personaService.getPersonasByArea(id).subscribe((data:any)=>{
      this.loading =false;
      this.personas =data.data;
    });
  }
 
}
