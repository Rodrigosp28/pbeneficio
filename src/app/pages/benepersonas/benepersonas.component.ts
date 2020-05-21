import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mPersona } from 'src/app/models/persona.model';
import { mLocalidad } from 'src/app/models/localidad.model';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { personaservice } from 'src/app/services/persona.service';
import { mbp } from 'src/app/models/bp.model';
import { beneficio } from 'src/app/models/beneficio.model';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
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

  imprimir(id: number) {
    this.personaservice.getBeneficioPorBeneficio(id).subscribe((data: any) => {
      // console.log(data);
      this.beneficiopersona = data.data[0];
    });
    const doc = new jsPDF("p","mm","a4");
    var loremipsum = this.beneficiopersona.descripcion;
    var lines = doc.splitTextToSize(loremipsum, 200) 
    var logo = new Image();
    logo.src = 'assets/esquina.jpg';

    // encabezado
    doc.addImage(logo, "JPEG", 5, 5, 200, 290);
    doc.setFontSize(18);
    doc.text("DIRECCION DE ATENCION CIUDADANA", 60, 30);
    doc.setFontSize(18);
    doc.text("ACTA DE ENTREGA", 60, 37);
    doc.setFontSize(18);
    doc.text(this.beneficiopersona.nombreBeneficio, 60, 44);
    //emite
    doc.setFontSize(14);
    doc.text("Jalpa de Mendez, Tabasco", 10, 70);
    doc.setFontSize(14);
    doc.setFontStyle("bold");
    doc.text(`ACTA No. ${id}`, 140, 55);
    doc.setFontSize(14);
    doc.setFontStyle("normal");
    doc.text(`${this.beneficiopersona.fecha}`, 10, 77);
    doc.setFontSize(14);
    doc.text("Direccion de atencion ciudadana", 10, 83);
    doc.setFontSize(14);
    doc.text("Tec. Graciela de la O Pérez", 10, 90);
    doc.setFontSize(14);
    doc.text("Directora de Atencion Ciudadana", 10, 97);
    // ciudadano
    doc.setFontSize(14);
    doc.text("C.", 10, 110);
    doc.setFontSize(14);
    doc.setFontStyle("bold");
    doc.text(`${this.persona.nombre} ${this.persona.apellidoPat} ${this.persona.apellidoMat}`, 16, 110);
    doc.setFontStyle("normal");
    doc.text("PARA FIRMAR DE CONFORMIDAD LA PRESENTE ACTA DE ENTREGA ",10,120);
    doc.text("RECEPCION DE: ",10,127);
    doc.setFontStyle("bold");
    doc.text(`${this.beneficiopersona.nombreBeneficio}`,50,127);
    doc.setFontStyle("normal");
    doc.text("Descripcion: ",10,134);
    doc.setFontStyle("bold");
    doc.setFontSize(12);
    doc.text(lines,10,139);
    doc.setFontSize(14);
    doc.setFontStyle("normal");
    doc.setFontSize(12);
    doc.text("Con cargo a la Referencia Económica: ISP-011.-",10,180);
    doc.setFontStyle("bold");
    doc.text("Apoyo Con Despensa Para Personas De Las Diferentes Comunidades Del Municipio.",10,187);
    doc.setFontStyle("normal");
    doc.text("Clasificador Por Objeto De Gasto: 44101.- ",10,194);
    doc.setFontStyle("bold");
    doc.text("Gastos relacionados con actividades culturales, deportivas y de ayuda extraordinaria. ",10,201);
    // pie
    doc.text("RECIBE: ",10,220);
    doc.text("________________________",10,235);
    doc.setFontSize(12);
    doc.text(`C. ${this.persona.nombre} ${this.persona.apellidoPat} ${this.persona.apellidoMat}`,10,242);
    doc.text(`INE: ${this.persona.claveLector}`,10,249);

    doc.setFontSize(14);

    doc.text("ENTREGA: ",130,220);
    doc.text("________________________",130,235);
    doc.setFontSize(12);
    doc.text("tec. Graciela de la O Pérez",130,242);
    doc.text("ATENCION CIUDADANA",130,249);
    doc.text("DIRECTORA",130,256);



    // doc.text(lines, 20, 20);
    // doc.text("This is courier normal.", 20, 250);

    doc.save(`${this.persona.nombre}_${this.beneficiopersona.fecha}.pdf`);
  }

}
