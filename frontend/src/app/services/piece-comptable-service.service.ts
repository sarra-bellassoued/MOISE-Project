// services/piece-comptable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PieceComptable,LignePieceComptable } from './systeme.interface';

@Injectable({
  providedIn: 'root'
})
export class PieceComptableService {
  private apiUrl = '/api/pieces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PieceComptable[]> {
    return this.http.get<PieceComptable[]>(this.apiUrl);
  }

  create(piece: PieceComptable): Observable<any> {
    return this.http.post(this.apiUrl, piece);
  }
  getPieceComptables(): Observable<PieceComptable[]> {
    return this.http.get<PieceComptable[]>(this.apiUrl);
  }
  getLignesByPiece(pieceId: number): Observable<LignePieceComptable[]> {
    const url = `${this.apiUrl}/${pieceId}/lignes`;
    return this.http.get<LignePieceComptable[]>(url);
  }


  
  update(piece: PieceComptable): Observable<PieceComptable> {
    return this.http.put<PieceComptable>(`${this.apiUrl}/${piece.id}`, piece);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}