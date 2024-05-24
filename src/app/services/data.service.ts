import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private nombreUsuarioKey = 'nombreUsuario';

  setNombreUsuario(nombre: string): void {
    localStorage.setItem(this.nombreUsuarioKey, nombre);
  }

  getNombreUsuario(): string {
    return localStorage.getItem(this.nombreUsuarioKey) || '';
  }
}
