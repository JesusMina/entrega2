import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {
  public palabras: string[] = [];
  public palabra: string = '';
  public iteracion: string[][] = [];
  public turno = 0;
  public nivel: string = 'normal';
  public tiempo: number = 0;
  private intervalo: any;

  constructor(public palabraSer: PalabraService) { }

  ngOnInit(): void {
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });
      this.seleccionarPalabra();
    });
  }

  seleccionarPalabra(): void {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = Array.from({ length: this.obtenerIntentos() }, () => Array(this.palabra.length).fill(''));
  }

  obtenerIntentos(): number {
    switch (this.nivel) {
      case 'facil':
        return 8;
      case 'normal':
        return 6;
      case 'dificil':
        return 3;
      default:
        return 6;
    }
  }

  avanzarTurno(): void {
    if (this.turno >= this.obtenerIntentos()) {
      this.detenerCronometro();
      console.log('Juego terminado');
      return;
    }
    this.turno++;
  }

  reiniciarJuego(): void {
    this.turno = 0;
    this.tiempo = 0;
    this.seleccionarPalabra();
    this.detenerCronometro();
  }

  iniciarCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  detenerCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  actualizarLetra(letra: string, indice: number): void {
    this.iteracion[this.turno][indice] = letra;
  }
}
