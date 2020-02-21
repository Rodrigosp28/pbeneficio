import { Component, OnInit } from '@angular/core';
import { Loginservice } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { mUsuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Usuario: mUsuario;
  idUsuario: string;
  idRol: string;
  nombre: string ='null';
  constructor(public loginservice: Loginservice,
              public router: Router) { 
    this.idRol = localStorage.getItem('rol');
    this.idUsuario = localStorage.getItem('user');
    this.getUsuario();
              }
  ngOnInit() {
  }

  getUsuario(){
    this.loginservice.ObtenerUsuarioPorId(this.idUsuario).subscribe((data:any)=>{
      this.Usuario = data.data[0];
      this.nombre = `${this.Usuario.nombre} ${this.Usuario.apePat}`;
    });
  }

  salir(){
    this.loginservice.logout();
    this.router.navigate(['login']);
  }

}
