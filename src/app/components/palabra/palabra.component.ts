import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-palabra',                
  templateUrl: './palabra.component.html', 
  styleUrls: ['./palabra.component.sass']  
})
export class PalabraComponent implements OnInit {
  @Input() palabra: string = '';          
  @Input() cont!: number;                 
  @Input() turno!: number;                
  @Input() letrasIngresadas: string[] = []; 
  @Input() clasesLetras: string[] = [];     
  @Input() showColors: boolean = false;     
  @Output() letraActualizada = new EventEmitter<{ letra: string, indice: number, estado: string }>();
  // Salida que emite un evento cuando una letra es actualizada

  public letras: string[] = []; // Variable pública para almacenar las letras de la palabra

  ngOnInit(): void {
    // Inicializa la variable 'letras' dividiendo la palabra en caracteres individuales
    this.letras = this.palabra.split('');
  }

  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    // Método que se llama cuando una letra es actualizada
    // Emite el evento 'letraActualizada' con la letra, índice y estado recibidos
    this.letraActualizada.emit(event);
  }
}
