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
  @Output() letraActualizada = new EventEmitter<{ letra: string, indice: number, estado: string }>();

  public letras: string[] = [];

  ngOnInit(): void {
    this.letras = this.palabra.split('');
  }

  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    this.letraActualizada.emit(event);
  }
}
