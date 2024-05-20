import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.sass']
})
export class PalabraComponent implements OnInit {
  @Input() palabra: string = '';
  @Input() cont!: number;
  @Input() turno!: number;
  public letras: string[] = [];

  ngOnInit(): void {
    this.letras = this.palabra.split('');
  }
}


