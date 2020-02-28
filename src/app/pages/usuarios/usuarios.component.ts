import { Component, OnInit } from '@angular/core';
import { mUsuario } from 'src/app/models/usuario.model';
import { Loginservice } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  user: mUsuario;
  usuarios: mUsuario[]= [];
  loading : boolean;
  activarusuario: number;
  activar:boolean;
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
  constructor(private _loginService: Loginservice,
              private router: Router) {
    this.user = new mUsuario();
    this.idRol = localStorage.getItem('rol')
    this.obtenerUsuarios();
   }

  ngOnInit() {
  }

  verUser(id: number){
    this.router.navigate(['log/usuarios',id])
  }

  obtenerUsuarios() {
    this.loading= true;
    this._loginService.ObtenerUsuarios().subscribe((data: any)=>{
      this.usuarios = data.data;
      this.loading = false;
      // console.log(this.usuarios);
    })
  }

  activarmodal(id:number, act:boolean) {
    this.activarusuario = id;
    this.activar=act;
    $('#activarmodal').modal();
  }

  activarguardar() {
    // console.log(this.user.activo);
    return this._loginService.activarUsuario(this.activarusuario,this.user.activo).subscribe((data: any)=>{
      this.obtenerUsuarios();
      // console.log(data);
      $('#activarmodal').modal('hide');

    })
  }

  eliminarUsuario(id: number) {
    Swal.fire({
      title: 'espere',
      text: 'Guardando informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this._loginService.eliminarUsuario(id).subscribe((data: any)=>{
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'se Guardaron los datos correctamente',
          icon: 'success'
        });
        this.obtenerUsuarios();
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: data.messages,
          icon: 'error'
        });
      }
    },(error: any)=>{
      Swal.fire({
        title: 'Error!',
        text: 'Error de Red',
        icon: 'error'
      });
    });
  }

}
