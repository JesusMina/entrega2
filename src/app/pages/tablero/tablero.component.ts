import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {
  // Conjunto de palabras posibles
  public palabras: string[] = [];
  // Palabras a adivinar
  public palabra: string = '';
  public iteracion: any[] = [];
  public turno = 0;
  public nivel: string = 'normal'; // Nivel por defecto

  constructor(public palabraSer: PalabraService) { }

  ngOnInit(): void {
    // Cargar palabras y seleccionar una al azar al inicio
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });
      this.seleccionarPalabra();
    });
  }

  // Método para seleccionar una palabra al azar
  seleccionarPalabra(): void {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = new Array(this.obtenerIntentos()).fill('');
  }

  // Método para obtener el número de intentos según el nivel seleccionado
  obtenerIntentos(): number {
    switch (this.nivel) {
      case 'facil':
        return 8;
      case 'normal':
        return 6;
      case 'dificil':
        return 3;
      default:
        return 6; // Nivel por defecto: normal
    }
  }

  // Método para avanzar al siguiente turno
  avanzarTurno(): void {
    // Verificar si el juego ha terminado
    if (this.turno >= this.obtenerIntentos()) {
      // Aquí puedes agregar lógica para el final del juego
      console.log('Juego terminado');
      return;
    }
    // Incrementar el turno
    this.turno++;
  }

  // Método para reiniciar el juego
  reiniciarJuego(): void {
    this.turno = 0;
    this.seleccionarPalabra();
  }
}

