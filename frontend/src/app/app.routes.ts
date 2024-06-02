import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { RegisterComponent } from './component/register/register.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { EntityComponent } from './component/entity/entity.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
      },
    {
        path: "login", 
        component: LoginFormComponent
    },
    {
        path: "register", 
        component: RegisterComponent
    },
    {
        path: "perfil", 
        component:  PerfilComponent
    },
    {
        path: "entity", 
        component:  EntityComponent
    }

];
// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//   })
  export class AppRoutingModule { }