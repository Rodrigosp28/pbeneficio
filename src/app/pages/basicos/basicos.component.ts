import { Component, OnInit } from '@angular/core';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { mLocalidad } from 'src/app/models/localidad.model';
import { mArea } from 'src/app/models/area.model';
import { mCargo } from 'src/app/models/cargo.model';
import { mRol } from 'src/app/models/rol.model';
import { beneficio } from 'src/app/models/beneficio.model';

declare var $: any;

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {
  localidad: mLocalidad[] = [];
  areas: mArea[] = [];
  cargos: mCargo[] = [];
  roles: mRol[] = [];
  beneficios: beneficio[] = [];

  locali: mLocalidad = new mLocalidad();
  area: mArea = new mArea();
  cargo: mCargo = new mCargo();
  rol: mRol = new mRol();
  beneficio: beneficio =  new beneficio();

  loadinglocalidad = false;
  loadingarea = false;
  loadingcargo = false;
  loadingrol = false;
  loadingbeneficio = false;

  constructor(public catalogoservice: Catalogoservice ) {
    this.loadinglocalidad = true;
    this.loadingarea = true;
    this.loadingcargo = true;
    this.loadingrol = true;
    this.loadingbeneficio = true;

    this.getLocalidad();
    this.getAreas();
    this.getCargos();
    this.getRoles();
    this.getBeneficio();
  }

  ngOnInit() {
  }

  getLocalidad() {
    this.loadinglocalidad = true;
    this.catalogoservice.GetLocalidades().subscribe((data: any) => {
      // console.log(data);
      this.localidad = data.data;
      // console.log(this.localidad);
      this.loadinglocalidad = false;
    });
  }

  getAreas() {
    this.loadingarea = true;
    this.catalogoservice.GetAreas().subscribe((data: any) => {
      this.areas = data.data;
      this.loadingarea = false;
    });
  }

  getCargos() {
    this.loadingcargo = true;
    this.catalogoservice.GetCargos().subscribe((data: any) => {
      this.cargos = data.data;
      // console.log(this.cargos);
      this.loadingcargo = false;
    });
  }

  getRoles() {
    this.loadingrol = true;
    this.catalogoservice.GetRoles().subscribe((data: any) => {
      this.roles = data.data;
      this.loadingrol = false;
    });
  }

  getBeneficio() {
    this.loadingbeneficio = true;
    this.catalogoservice.GetBeneficios().subscribe((data: any) => {
      this.beneficios = data.data;
      this.loadingbeneficio = false;
    });
  }

  deleteLocalidad(id: number) {
    return this.catalogoservice.DeleteLocalidades(id).subscribe((data: any) => {
      // console.log(data);
      this.getLocalidad();
    });
  }

  deleteArea(id: number) {
    console.log(id);
    return this.catalogoservice.DeleteArea(id).subscribe((data: any) => {
    // console.log(data);
    this.getAreas();
    });
  }

  deleteCargo(id: number) {
    return this.catalogoservice.DeleteCargo(id).subscribe((data: any) => {
      // console.log(data);
      this.getCargos();
    });
  }
  deleteRol(id: number) {
    return this.catalogoservice.deteteRol(id).subscribe((data: any) => {
      this.getRoles();
    });
  }
  deleteBene(id: number) {
    return this.catalogoservice.deleteBeneficio(id).subscribe((data: any) => {
      if(data.success){
        this.getBeneficio();
        return;
      }
      else{
        alert(data.messages);
      }
      
    });
  }

  insertLocalidad(locali: mLocalidad) {
    return this.catalogoservice.PostLocalidades(locali).subscribe((data: any  ) => {
      // console.log(data);
      this.getLocalidad();
      $('#localidadmodal').modal('hide');

    }); 
  }

  insertArea(area: mArea) {
    return this.catalogoservice.PostArea(area).subscribe((data: any) => {
      // console.log(data);
      this.getAreas();
      $('#areamodal').modal('hide');

    });
  }
  insertCargo(cargo: mCargo) {
    // console.log(cargo);
    return this.catalogoservice.PostCargo(cargo).subscribe((data: any) => {
      // console.log(data);
      this.getCargos();
      $('#cargomodal').modal('hide');

    });
  }

  insertRol(rol: mRol) {
    return this.catalogoservice.PostRol(rol).subscribe((data: any) => {
      this.getRoles();
      // console.log(data);
      $('#rolmodal').modal('hide');
    });
  }
  insertBeneficio(bene: beneficio) {
    return this.catalogoservice.PostBeneficio(bene).subscribe((data: any) => {
      this.getBeneficio();
      // console.log(data);
      $('#beneficioomodal').modal('hide');
    });
  }

  modalLocalidad() {
    $('#localidadmodal').modal();
  }

  modalArea() {
    $('#areamodal').modal();
  }
  modalCargos() {
    $('#cargomodal').modal();
  }
  modalRoles() {
    $('#rolmodal').modal();
  }
  modalBeneficios() {
    $('#beneficioomodal').modal();
  }

}
