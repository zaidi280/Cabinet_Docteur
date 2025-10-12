import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revenu } from 'src/Models/Revenu';

@Injectable({
  providedIn: 'root'
})
export class RevenuService {
  private apiUrl = 'http://127.0.0.1:8000/api/revenues';
  constructor(private http: HttpClient) {}

  getRevenues(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  deleteRevenue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Récupérer un revenu par son ID
  getRevenueById(id: number): Observable<Revenu> {
    return this.http.get<Revenu>(`${this.apiUrl}/${id}`);
  }
  // Ajouter un nouveau revenu
  addRevenue(revenue: Revenu): Observable<Revenu> {
    return this.http.post<Revenu>(this.apiUrl, revenue);
  }
  // Mettre à jour un revenu existant
  updateRevenue(id: number, revenue: Revenu): Observable<Revenu> {
    return this.http.put<Revenu>(`${this.apiUrl}/${id}`, revenue);
  }
  // Récupérer des revenus filtrés (si votre API le supporte)
  getFilteredRevenues(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtered`);
  }

}