import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { PalabraComponent } from './components/palabra/palabra.component';
import { LetraComponent } from './components/letra/letra.component';
import { FormsModule} from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    PalabraComponent,
    LetraComponent,
    InicioComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
