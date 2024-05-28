import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-letra',                
  templateUrl: './letra.component.html', 
  styleUrls: ['./letra.component.sass']  
})
export class LetraComponent implements OnInit {
  @Input() letra: string = '';          // Entrada para la letra específica del componente
  @Input() palabra: string = '';        // Entrada para la palabra completa
  @Input() turnoActual: number = 0;     // Entrada para el turno actual del juego
  @Input() indice: number = 0;          // Entrada para el índice del carácter en la palabra
  @Input() estadoInicial: string = '';  // Entrada para el estado inicial de la letra
  @Input() showColors: boolean = false; // Entrada para controlar la visualización de colores
  @Output() letraActualizada = new EventEmitter<{ letra: string, indice: number, estado: string }>();
  // Salida que emite un evento cuando la letra se actualiza

  public miletra: string = ''; // Variable pública para almacenar la letra ingresada por el usuario
  public sass: string = '';    // Variable pública para almacenar el estado CSS

  ngOnInit(): void {
    // Inicializa las variables cuando el componente se monta
    this.miletra = '';
    this.sass = this.estadoInicial; // Establece el estado inicial CSS
  }

  verificar(): void {
    
    if (this.miletra.trim() === '') {
      
      this.sass = '';
    } else if (this.miletra === this.letra) {
      
      this.sass = 'acierto';
    } else if (this.palabra.includes(this.miletra)) {
      
      this.sass = 'present';
    } else {
      
      this.sass = 'absent';
    }
    // Emite un evento con la letra actualizada, su índice y su estado
    this.letraActualizada.emit({ letra: this.miletra, indice: this.indice, estado: this.sass });
  }
}
