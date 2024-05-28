import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',               
  templateUrl: './inicio.component.html', 
  styleUrls: ['./inicio.component.sass']  
})
export class InicioComponent {
  public nombre: string = '';            // Variable pública para almacenar el nombre del usuario
  public nombreRequerido: boolean = false; // Variable pública para indicar si el nombre es requerido

  // Constructor que inyecta los servicios Router y DataService
  constructor(private router: Router, private dataService: DataService) { }

  // Método para guardar el nombre del usuario y navegar al tablero
  guardarNombre(): void {
    if (this.nombre.trim() === '') {
      // Si el nombre está vacío, establece 'nombreRequerido' en true y sale del método
      this.nombreRequerido = true;
      return;
    }
    // Si el nombre no está vacío, establece 'nombreRequerido' en false
    this.nombreRequerido = false;
    // Guarda el nombre del usuario usando el servicio DataService
    this.dataService.setNombreUsuario(this.nombre);
    // Navega a la ruta '/tablero' usando el Router
    this.router.navigate(['/tablero']);
  }
}
