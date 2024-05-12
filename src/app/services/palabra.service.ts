import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  public palabras:  string[]  =[ ]
  constructor(
    public http: HttpClient
  ) { }
  get(){
    return this.http.get('http://localhost:3000/palabras')

  }
  
}
