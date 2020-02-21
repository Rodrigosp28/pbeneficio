import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent} from './pages/index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { HomeComponent } from './pages/home/home.component';
import { BasicosComponent } from './pages/basicos/basicos.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SinregistroComponent } from './shared/sinregistro/sinregistro.component';
import { BenepersonasComponent } from './pages/benepersonas/benepersonas.component';
import { AppRoutingModule } from './app-routing.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ApoyosComponent } from './pages/apoyos/apoyos.component';
import { LocalidadComponent } from './pages/localidad/localidad.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    HomeComponent,
    IndexComponent,
    BasicosComponent,
    LoginComponent,
    PersonaComponent,
    SinregistroComponent,
    BenepersonasComponent,
    BuscarComponent,
    ApoyosComponent,
    LocalidadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
