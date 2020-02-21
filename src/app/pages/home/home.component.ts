import { Component, OnInit } from '@angular/core';
import { personaservice } from 'src/app/services/persona.service';
import { mPersona } from 'src/app/models/persona.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  personas: mPersona[] = [];
  loading: boolean = false;
  idRol: string='null';
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public personaservice: personaservice,
              public router: Router) {

        this.getpersonas();
        this.loading = true;
        this.idRol = localStorage.getItem('rol');
   }

  ngOnInit() {
  }
  getpersonas(){
    this.loading = true;
    this.personaservice.getPersonas().subscribe((data: any) => {
      this.personas = data.data;
      this.loading = false;
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
    this.personaservice.deletePersona(id).subscribe((data:any)=>{
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'Datos Eliminados',
          icon: 'success'
        });
        this.getpersonas();
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

