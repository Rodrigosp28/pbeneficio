import { Component, OnInit } from '@angular/core';
import { mPersona } from 'src/app/models/persona.model';
import { personaservice } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  cl: string;
  item: string;
  personas: mPersona[]=[];
  loading = false;
  idRol: string;
  constructor(public personaservice: personaservice,
              public router:Router) {
      this.idRol = localStorage.getItem('rol');
   }

  ngOnInit() {
  }

  buscar(){
    if (this.cl === 'clave') {
      // console.log(this.item);
      this.loading = true;
      if(this.item.length>0){
        this.personaservice.BuscarPersonaPorClave(this.item).subscribe((data:any)=>{
          //console.log(data);
          this.personas = data.data;
          this.loading=false;
          return;
        },(error:any)=>{
          alert('colocar caracteres validos');
        });
        return;
      }
      else{
        this.loading=false;
        this.personas =[];
        return;
      }
    }
    if (this.cl === 'nombre'){
      // console.log(this.item);
      this.loading = true;
      if(this.item.length>0){
        this.personaservice.BuscarPersonaPorNombre(this.item).subscribe((data:any)=>{
          //console.log(data);
          this.personas = data.data;
          this.loading=false;
        },(error:any)=>{
          alert('colocar caracteres validos');
        });
        return;
      }
      else{
        this.loading=false;
        this.personas =[];
        return;
      }
    }
    else{
      console.log('sin selec');
      alert('Seleccionar una Opcion');
      return;
    }
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
        this.personaservice.BuscarPersonaPorNombre(this.item).subscribe((data:any)=>{
          console.log(data);
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
