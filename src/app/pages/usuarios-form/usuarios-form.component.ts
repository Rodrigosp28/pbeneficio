import { Component, OnInit } from '@angular/core';
import { mRol } from 'src/app/models/rol.model';
import { mCargo } from 'src/app/models/cargo.model';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { mUsuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Loginservice } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  roles:mRol[]= [];
  cargos: mCargo[]= [];
  usuario:mUsuario;
  idRol;
  activaruser = [
    {
      idactivar:false,
      descripcion: 'INHABILITAR'
    },
    {
      idactivar:true,
      descripcion: 'HABILITAR'
    }
  ];
  dform;
  constructor(private _catalogoService: Catalogoservice,
              private router: Router,
              private _loginService:Loginservice,
              private activedRouter: ActivatedRoute) {
                const id= this.activedRouter.snapshot.paramMap.get('id');
      this.idRol = localStorage.getItem('rol');
      if(id){
      this.obtenerUsuarioByid(id);
    }
    this.usuario = new mUsuario();
    this.obtenerCargos();
    this.obtenerRoles();
   }

  ngOnInit() {
    
  }

  obtenerUsuarioByid(id:string){
    this._loginService.ObtenerUsuarioPorId(id).subscribe((data: any)=>{
      console.log("existe");
      this.dform =true;
      this.usuario = data.data[0];
      // console.log(data);
    })
  }

  guardarUsuario(form: NgForm) {
    // console.log(form);
    if (form.invalid){
      Swal.fire({
        title: 'Error!',
        text: 'Insertar Todos Los Datos',
        icon: 'error'
      });
      return;
    }
    this.usuario.nombre.toLocaleUpperCase();
    this.usuario.apePat.toLocaleUpperCase();
    this.usuario.apeMat.toLocaleUpperCase();
    Swal.fire({
      title: 'espere',
      text: 'Guardando informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this._loginService.insertarUsuario(this.usuario).subscribe((data: any)=>{
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'se Guardaron los datos correctamente',
          icon: 'success'
        });
        this.router.navigate(['log/usuarios']);
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: data.messages,
          icon: 'error'
        });
      }
    },(error:any)=>{
      Swal.fire({
        title: 'Error!',
        text: 'Error de Red',
        icon: 'error'
      });
    });

  }

  obtenerRoles() {
    return this._catalogoService.GetRoles().subscribe((data: any)=>{
      this.roles = data.data;
      // console.log(this.roles);
    });
  }

  obtenerCargos() {
    return this._catalogoService.GetCargos().subscribe((data: any) =>{
      this.cargos = data.data;
    });
  }
  
  cerrar() {
      this.router.navigate(['log/usuarios']);
  }

}
