import { Component, OnInit } from '@angular/core';
import { mLocalidad } from 'src/app/models/localidad.model';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { mPersona } from 'src/app/models/persona.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { personaservice } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  localidades: mLocalidad [] = [];
  persona: mPersona = new mPersona();
  constructor(public catalogoservice: Catalogoservice,
              public personaservice: personaservice,
              private router: Router) {
    catalogoservice.GetLocalidades().subscribe((data:any)=>{
      this.localidades = data.data;
    });
    this.persona.idUser = Number(localStorage.getItem('user'));
   }
  
  ngOnInit() {

  }
  guardarPersona(form: NgForm){
    if (form.invalid){
      console.log('formulario invalido');
      return;
    }
    this.persona.nombre = this.persona.nombre.toUpperCase();
    this.persona.apellidoPat = this.persona.apellidoPat.toUpperCase();
    this.persona.apellidoMat= this.persona.apellidoMat.toUpperCase();
    // console.log(this.persona);
    Swal.fire({
      title: 'espere',
      text: 'Guardando informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    // console.log(this.persona);
    this.personaservice.PostPersona(this.persona).subscribe((data: any)=>{
      // console.log(data);
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'se Guardaron los datos correctamente',
          icon: 'success'
        });
        this.router.navigate(['log/persona',data.id]);
      }
      else {
        // console.log(data);
        Swal.fire({
          title: 'Error!',
          text: data.messages,
          icon: 'error'
        });
      }
    });
  }
  cerrar(){
   this.router.navigate(['log/personas']);
  }

}
