import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';
import { DataService } from 'src/app/services/data.service';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {
  public palabras: string[] = [];
  public palabra: string = '';
  public iteracion: { letras: string[], clases: string[], showColors: boolean }[] = [];
  public turno = 0;
  public nivel: string = 'normal';
  public tiempo: number = 0;
  public nombreUsuario: string = '';
  public records: { id: string, nombre: string, tiempo: number }[] = [];
  private intervalo: any;

  constructor(
    private palabraSer: PalabraService,
    private dataService: DataService,
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = this.dataService.getNombreUsuario();
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });
      this.seleccionarPalabra();
      console.log(this.palabra);
    });
    this.cargarRecords();
    
  }

  seleccionarPalabra(): void {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = Array.from({ length: this.obtenerIntentos() }, () => ({
      letras: Array(this.palabra.length).fill(''),
      clases: Array(this.palabra.length).fill(''),
      showColors: false
    }));
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
      return;
    }
    this.iteracion[this.turno].showColors = true;
    this.verificarVictoria();
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

  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    this.iteracion[this.turno].letras[event.indice] = event.letra;
    this.iteracion[this.turno].clases[event.indice] = event.estado;
  }

  cambiarNivel(nuevoNivel: string): void {
    const confirmar = window.confirm('Cambiar el nivel reiniciará el juego y se perderá el progreso actual. ¿Desea continuar?');
    if (confirmar) {
      this.nivel = nuevoNivel;
      this.reiniciarJuego();
    }
  }

  verificarVictoria(): void {
    const todasAciertos = this.iteracion[this.turno].clases.every(clase => clase === 'acierto');
    if (todasAciertos) {
      this.detenerCronometro();
      this.recordService.addRecord({ nombre: this.nombreUsuario, tiempo: this.tiempo }).subscribe(() => {
        this.cargarRecords();
      });
      setTimeout(() => {
        alert('¡Has ganado!');
        this.reiniciarJuego();
      }, 500);
    }
  }

  cargarRecords(): void {
    this.recordService.getRecords().subscribe((records: any[]) => {
      this.records = records;
    });
  }

  eliminarRecord(id: string): void {
    this.recordService.deleteRecord(id).subscribe(() => {
      this.cargarRecords();
    });
  }
}
