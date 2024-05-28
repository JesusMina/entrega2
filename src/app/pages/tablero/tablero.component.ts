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
  public palabras: string[] = [];               // Array para almacenar las palabras disponibles
  public palabra: string = '';                  // La palabra actual del juego
  public iteracion: { letras: string[], clases: string[], showColors: boolean }[] = []; // Array para almacenar el estado de cada intento
  public turno = 0;                             // Número del turno actual
  public nivel: string = 'normal';              // Nivel de dificultad actual
  public tiempo: number = 0;                    // Tiempo transcurrido en segundos
  public nombreUsuario: string = '';            // Nombre del usuario
  public records: { id: string, nombre: string, tiempo: number }[] = []; // Array para almacenar los records de los jugadores
  private intervalo: any;                       // Variable para almacenar el intervalo del cronómetro

  // Constructor que inyecta los servicios necesarios
  constructor(
    private palabraSer: PalabraService,
    private dataService: DataService,
    private recordService: RecordService
  ) { }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.nombreUsuario = this.dataService.getNombreUsuario(); // Obtiene el nombre del usuario del servicio DataService
    this.palabraSer.get().subscribe((res: any) => { // Obtiene las palabras del servicio PalabraService
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });
      this.seleccionarPalabra(); // Selecciona una palabra aleatoria para el juego
      console.log(this.palabra);
    });
    this.cargarRecords(); // Carga los records de los jugadores
  }

  // Método para seleccionar una palabra aleatoria del array de palabras
  seleccionarPalabra(): void {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = Array.from({ length: this.obtenerIntentos() }, () => ({
      letras: Array(this.palabra.length).fill(''),
      clases: Array(this.palabra.length).fill(''),
      showColors: false
    }));
  }

  // Método para obtener el número de intentos basado en el nivel de dificultad
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

  // Método para avanzar al siguiente turno
  avanzarTurno(): void {
    // Verifica si todos los cuadros están completos
    const palabraCompleta = this.iteracion[this.turno].letras.every(letra => letra !== '');
    
    if (!palabraCompleta) {
      alert('Debe completar la palabra antes de enviar.');
      return;
    }

    // Si todos los cuadros están completos, avanza al siguiente turno
    if (this.turno >= this.obtenerIntentos()) {
      this.detenerCronometro();
      return;
    }

    this.iteracion[this.turno].showColors = true; // Muestra los colores del turno actual
    this.verificarVictoria(); // Verifica si el jugador ha ganado
    this.turno++;
  }

  // Método para reiniciar el juego
  reiniciarJuego(): void {
    this.turno = 0;
    this.tiempo = 0;
    this.seleccionarPalabra(); // Selecciona una nueva palabra
    this.detenerCronometro(); // Detiene el cronómetro
  }

  // Método para iniciar el cronómetro
  iniciarCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  // Método para detener el cronómetro
  detenerCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  // Método para actualizar el estado de una letra
  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    this.iteracion[this.turno].letras[event.indice] = event.letra;
    this.iteracion[this.turno].clases[event.indice] = event.estado;
  }

  // Método para cambiar el nivel de dificultad
  cambiarNivel(nuevoNivel: string): void {
    const confirmar = window.confirm('Cambiar el nivel reiniciará el juego y se perderá el progreso actual. ¿Desea continuar?');
    if (confirmar) {
      this.nivel = nuevoNivel;
      this.reiniciarJuego();
    }
  }

  // Método para verificar si el jugador ha ganado
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

  // Método para cargar los records de los jugadores
  cargarRecords(): void {
    this.recordService.getRecords().subscribe((records: any[]) => {
      this.records = records
        .sort((a, b) => a.tiempo - b.tiempo)
        .slice(0, 5); // Muestra los 5 mejores tiempos
    });
  }

  // Método para eliminar un record
  eliminarRecord(id: string): void {
    this.recordService.deleteRecord(id).subscribe(() => {
      this.cargarRecords(); // Recarga los records después de eliminar uno
    });
  }
}
