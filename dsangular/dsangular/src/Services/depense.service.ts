import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from 'src/Models/Depense';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private apiUrl = 'http://127.0.0.1:8000/api/depenses';

  constructor(private http: HttpClient) {}

  getdepenses(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  deletedepence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
// Récupérer un depense par son ID
getDepenseById(id: number): Observable<Depense> {
    return this.http.get<Depense>(`${this.apiUrl}/${id}`);
  }
  // Ajouter un nouveau depense
  addDepense(depense: Depense): Observable<Depense> {
    return this.http.post<Depense>(this.apiUrl, depense);
  }
  // Mettre à jour un depense existant
  updatedepense(id: number, depense: Depense): Observable<Depense> {
    return this.http.put<Depense>(`${this.apiUrl}/${id}`, depense);
  }



}