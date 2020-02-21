import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Loginservice} from '../../services/login.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  pass: string;
  constructor(public loginservice: Loginservice,
              public router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm){
    if(form.invalid){return;}
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'iniciando sesion...'
    });
    Swal.showLoading();
    this.loginservice.login(this.usuario,this.pass).subscribe(data => {
      // console.log(data);
      this.router.navigate(['user']);
      Swal.close();
    },(err:any)=>{
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error al Autenticar',
        text: err.error.error_description
      });
      console.log(err);
      console.log(err.error['error_description'])});

  }

}
