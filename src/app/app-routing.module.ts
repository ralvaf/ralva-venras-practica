import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './page/about/about.component';
import { ClienteComponent } from './page/cliente/cliente.component';
import { InicioComponent } from './page/inicio/inicio.component';

const routes: Routes = [
  {path: '',
    component: InicioComponent,
    children : [
      {path: '', component: ClienteComponent},
      {path: 'about', component: AboutComponent},
    ]
  },
  // {path: '', component: InicioComponent}
  //{path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
