import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mPersona } from 'src/app/models/persona.model';
import { mLocalidad } from 'src/app/models/localidad.model';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { personaservice } from 'src/app/services/persona.service';
import { mbp } from 'src/app/models/bp.model';
import { beneficio } from 'src/app/models/beneficio.model';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-benepersonas',
  templateUrl: './benepersonas.component.html',
  styleUrls: ['./benepersonas.component.css']
})
export class BenepersonasComponent implements OnInit {
  loading: boolean = false;
  persona:mPersona = new mPersona();
  localidades: mLocalidad [] = [];
  apoyos: mbp[] = [];
  beneficiopersona: mbp = new mbp();
  beneficios: beneficio[]=[];
  d;
  m;
  a;
  date;
  fechaa;
  nombrecomple;
  constructor(public routeractivated: ActivatedRoute,
              public catalogoservice: Catalogoservice,
              public personaservice: personaservice) {
    
    this.beneficiopersona.idUser = Number(localStorage.getItem('user'));
    this.loading = true;
    this.routeractivated.params.subscribe(params =>{
      this.persona.idPersona = params['id'];
      // console.log(this.persona);
      this.beneficiopersona.idPersona = this.persona.idPersona;
      
    });
    this.catalogoservice.GetLocalidades().subscribe((data:any)=>{
      this.localidades = data.data;
    });
    this.catalogoservice.GetBeneficios().subscribe((data:any)=>{
      this.beneficios = data.data;
    });
    this.personaservice.getPersonaPorId(this.persona.idPersona).subscribe((data: any)=>{
      this.persona = data.data[0];
      this.nombrecomple = `${this.persona.nombre } ${this.persona.apellidoPat}`;
    });
    
    this.getBp();
   }

  ngOnInit() {
  }

  getBp(){
    this.loading = true;

    this.personaservice.getBeneficioPorPersona(this.persona.idPersona).subscribe((data: any) => {
      this.apoyos = data.data;
      this.loading = false;
      // console.log(this.apoyos);
    });
  }

  modalBeneficios() {
    $('#beneficiomodal').modal();
    this.beneficiopersona.idBeneficio = 0;
    this.beneficiopersona.nombreArea = '';
    this.beneficiopersona.nombreBeneficio = '';
    this.beneficiopersona.fecha ='';
    this.beneficiopersona.descripcion ='';
    this.date = new Date();
    this.d = this.date.getDate().toString();
    this.m = this.date.getMonth() + 1;
    this.a = this.date.getFullYear().toString();
    this.fechaa = `${this.d}/${this.m}/${this.a}`;
    this.beneficiopersona.fecha = this.fechaa;
  }
  insertarpersona() {
    // console.log(this.beneficiopersona);
    
    this.personaservice.insertarBeneficioPersona(this.beneficiopersona).subscribe((data: any) => {
      // console.log(data);
      // console.log(this.beneficiopersona);
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'se Guardaron los datos correctamente',
          icon: 'success'
        }).then((result)=>{
          if(result.value){
            Swal.close();
            $('#beneficiomodal').modal('hide');
            this.getBp();
          }
        });
        
      }
      else {
        console.log(data);
        Swal.fire({
          title: 'Error!',
          text: data.messages,
          icon: 'error'
        });
      }
    });
    return; 
  }

  modalBeneficiosview(id: number) {
    $('#beneficiomodalview').modal();
    this.personaservice.getBeneficioPorBeneficio(id).subscribe((data: any) => {
      // console.log(data);
      this.beneficiopersona = data.data[0];
    });
  }

}
