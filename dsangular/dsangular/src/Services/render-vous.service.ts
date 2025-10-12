import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { RendezVous } from 'src/Models/RendezVous';

@Injectable({
  providedIn: 'root'
})
export class RenderVousService {
  private apiUrl = 'http://127.0.0.1:8000/api/rendezVous';
  private revenueUrl = 'http://127.0.0.1:8000/api/revenues';
  private patientUrl = 'http://127.0.0.1:8000/api/patients/filtered'; // URL pour récupérer les patients filtrés
  constructor(private http: HttpClient) {}
  // Récupérer la liste des rendez-vous avec pagination et filtrage par recherche
  getRendezvous(
    page: number,
    pageSize: number,
    date?: any,
    name: string = '',
    status: string = ''
  ): Observable<any> {
    const params: any = { 
      page, 
      pageSize 
    };
    // Add parameters only if they are not empty
    if (name) {
      params.name = name;
    }
    if (status) {
      params.status = status;
    }
    if (date && !isNaN(new Date(date).getTime())) {
      params.date = new Date(date).toISOString();
    }
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }
  // Récupérer un rendez-vous par son ID
  getRendezvousById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.apiUrl}/${id}`);
  }
  // Ajouter un nouveau rendez-vous
  addRendezvous(rendezvous: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rendezvous);
  }
  // Mettre à jour un rendez-vous existant
  updateRendezvous(id: number, rendezvous: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${id}`, rendezvous);
  }

  // Supprimer un rendez-vous par son ID
  deleteRendezvous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  markAsDone(id: number, montant: number): Observable<any> {
    // Mettre à jour le rendez-vous en tant que "terminé"
    return this.http.patch(`${this.apiUrl}/${id}/markAsDone`, {}).pipe(
      // Ensuite, créer le revenu si la mise à jour du rendez-vous réussit
      switchMap(() => {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
        const revenueData = {
          descriptionrev: `Rendez-vous num #${id}`,
          amountrev: montant,
          daterev: formattedDate // Assurez-vous que cela correspond au format DATETIME de MySQL
        };

        return this.http.post(this.revenueUrl, revenueData);
      })
    );
  }

  // Méthode pour obtenir la liste des patients filtrés
  getFilteredPatients(): Observable<any> {
    return this.http.get(this.patientUrl);
  }
}
