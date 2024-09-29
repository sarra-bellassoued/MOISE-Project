// services/compte-comptable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompteComptable } from './systeme.interface';

@Injectable({
  providedIn: 'root'
})
export class CompteComptableService {
  private apiUrl = '/api/comptes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CompteComptable[]> {
    return this.http.get<CompteComptable[]>(this.apiUrl);
  }
  get(id: number): Observable<CompteComptable> {
    return this.http.get<CompteComptable>(`${this.apiUrl}/${id}`);
  }

  create(compte: CompteComptable): Observable<CompteComptable> {
    return this.http.post<CompteComptable>(this.apiUrl, compte);
  }

  update(compte: CompteComptable): Observable<CompteComptable> {
    return this.http.put<CompteComptable>(`${this.apiUrl}/${compte.id}`, compte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
