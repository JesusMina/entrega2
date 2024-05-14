import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent {
  @Input() letra: string = '';
  public miletra: string = '';
  opcion: string = ''
  sass: string = ''

  verificar() {
    if (this.miletra.trim() === '') {
      this.sass = ''; // Restablecer el estado de CSS cuando la opción se borra
    } else if (this.miletra === this.letra) {
      this.sass = 'acierto';
    } else if (this.letra.includes(this.miletra)) {
      this.sass = 'present';
    } else {
      this.sass = 'absent';
    }
  }
  
}

  
  
  

  

