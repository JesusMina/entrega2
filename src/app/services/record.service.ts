import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://localhost:3000/records';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRecord(record: { nombre: string, tiempo: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, record);
  }

  deleteRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
