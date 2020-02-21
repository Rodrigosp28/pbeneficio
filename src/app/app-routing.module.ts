import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { BasicosComponent } from './pages/basicos/basicos.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { BenepersonasComponent } from './pages/benepersonas/benepersonas.component';
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';
import { ApoyosComponent } from './pages/apoyos/apoyos.component';
import { LocalidadComponent } from './pages/localidad/localidad.component';

const routes: Routes = [
  {
     path: 'log', 
    component: IndexComponent,
    canActivate:[AuthGuard],
    children:[
      { path: 'personas', component: HomeComponent},
      { path: 'personas/nueva', component: PersonaComponent},
      { path: 'persona/:id', component: BenepersonasComponent},
      { path: 'catalogos', component: BasicosComponent, 
      canActivate:[RolGuard] },
      { path: 'buscar', component: BuscarComponent },
      { path: 'apoyos', component: ApoyosComponent },
      { path: 'localidad', component: LocalidadComponent },
      { path: '**', pathMatch:'full', redirectTo: 'personas' }

    ] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch:'full', redirectTo: 'log' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }