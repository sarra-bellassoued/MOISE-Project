// services/journal-comptable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalComptable, PieceComptable, LignePieceComptable } from './systeme.interface';
@Injectable({
  providedIn: 'root'
})
export class JournalComptableService {
  private apiUrl = '/api/journals';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JournalComptable[]> {
    return this.http.get<JournalComptable[]>(this.apiUrl);
  }
 
  getJournalComptables(): Observable<JournalComptable[]> {
    return this.http.get<JournalComptable[]>(this.apiUrl);
  }
  create(journal: JournalComptable): Observable<JournalComptable> {
    return this.http.post<JournalComptable>(this.apiUrl, journal);
  }

  update(journal: JournalComptable): Observable<JournalComptable> {
    return this.http.put<JournalComptable>(`${this.apiUrl}/${journal.id}`, journal);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getPiecesByJournalId(journalId: number): Observable<PieceComptable[]> {
    return this.http.get<PieceComptable[]>(`${this.apiUrl}/${journalId}/pieces`);
  }

  getLignesByPieceId(pieceId: number): Observable<LignePieceComptable[]> {
    return this.http.get<LignePieceComptable[]>(`${this.apiUrl}/pieces/${pieceId}/lignes`);
  }

}

