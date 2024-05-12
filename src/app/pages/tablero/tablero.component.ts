import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit{
  //conjunto de palabras posibles
  public palabras: string[] = [];
  //palabras a adivinar
  public palabra: string = '';
  public iteracion: any[] = [];
  public turno = 0;
  constructor(
    public palabraSer: PalabraService
  ) { }
  ngOnInit(): void {
    //this.palabras = ['fuego', 'perla','perro','sapas','borra','almas'];
    this.palabraSer.get().subscribe((res: any)=>{
      res.forEach((element: any) => {
        this.palabras.push(element.palabra)
      });
      this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      this.iteracion = new Array(6).fill('');
    });

  }

}
