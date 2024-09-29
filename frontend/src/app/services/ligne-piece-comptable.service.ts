// services/ligne-piece-comptable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LignePieceComptable } from './systeme.interface';

@Injectable({
  providedIn: 'root'
})
export class LignePieceComptableService {
  private apiUrl = '/api/lignes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LignePieceComptable[]> {
    return this.http.get<LignePieceComptable[]>(this.apiUrl);
  }

  create(ligne: LignePieceComptable): Observable<LignePieceComptable> {
    return this.http.post<LignePieceComptable>(this.apiUrl, ligne);
  }

  /*update(ligne: LignePieceComptable): Observable<LignePieceComptable> {
    return this.http.put<LignePieceComptable>(`${this.apiUrl}/${ligne.id}`, ligne);
  }*/

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
