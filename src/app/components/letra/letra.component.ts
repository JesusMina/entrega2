import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent implements OnInit {
  @Input() letra: string = '';
  @Input() palabra: string = '';
  @Input() turnoActual: number = 0;
  @Input() indice: number = 0;
  public miletra: string = '';
  public sass: string = '';

  ngOnInit(): void {
    this.miletra = ''; // Initialize the letter
  }

  verificar(): void {
    if (this.miletra.trim() === '') {
      this.sass = ''; // Restablecer el estado de CSS cuando la opción se borra
    } else if (this.miletra === this.letra) {
      this.sass = 'acierto';
    } else if (this.palabra.includes(this.miletra)) {
      this.sass = 'present';
    } else {
      this.sass = 'absent';
    }
  }
}


  
  
  

  

