import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaladieService {

  private apiUrl = 'http://127.0.0.1:8000/api/maladies';
  constructor(private http: HttpClient) {}

  getMaladies(page: number, pageSize: number, nom_maladie: string, name: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        nom_maladie,
        name,
      }
    });
  }

  deleteMaladie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addMaladie(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getMaladieById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateMaladie(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);



}

}