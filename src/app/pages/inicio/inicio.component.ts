import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent {
  public nombre: string = '';

  constructor(private router: Router, private dataService: DataService) { }

  guardarNombre(): void {
    this.dataService.setNombreUsuario(this.nombre);
    this.router.navigate(['/tablero']);
  }
}
