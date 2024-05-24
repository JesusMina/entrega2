import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './pages/tablero/tablero.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'tablero', component: TableroComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
