import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentification/auth.service';
import { RendezVous } from 'src/Models/RendezVous';
import { RenderVousService } from 'src/Services/render-vous.service';

@Component({
  selector: 'app-render-vous',
  templateUrl: './render-vous.component.html',
  styleUrls: ['./render-vous.component.css']
})
export class RenderVousComponent {
  rendezVous: RendezVous[] = [];
  currentPage = 1;
  totalPages = 1;
  date = '';
  name = '';
  status = '';
  pageSize = 10;
  constructor(
    private RVS: RenderVousService,
    private router: Router,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.fetchRendezVous();
  }
  fetchRendezVous(): void {
    const dateObj = new Date(this.date); // Convert the date string to a Date object
    this.RVS.getRendezvous(this.currentPage, this.pageSize, dateObj, this.name, this.status).subscribe({
      next: (response: any) => {
        const data = response.rendezVous.map((item: any) => ({
          ...item,
          patient_nom: item.patient.nom,
          patient_prenom: item.patient.prenom,
        }));
        this.rendezVous = data;
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des rendez-vous', err);
      }
    });
  }
  markAsDone(id: number, montant: number): void {
    this.RVS.markAsDone(id, montant).subscribe({
      next: (response) => {
        console.log('Revenue created successfully:', response);
        this.fetchRendezVous(); // Rafraîchir la liste des rendez-vous
      },
      error: (error) => {
        console.error('Error occurred while marking the rendezvous as done', error);
        alert('Erreur lors de la mise à jour du statut ou de la création de la revenue.');
      }
    });
  }
  deleteRendezVous(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      this.RVS.deleteRendezvous(id).subscribe({
        next: () => {
          alert('Rendez-vous supprimée avec succès !');
          this.fetchRendezVous(); // Refresh the list after updating
        },
        error: (err) => {
          console.error('Error deleting rendezvous', err);
          alert('Erreur lors de la suppression du rendez-vous.');
        }
      });
    }
  }
  handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchRendezVous();
    }
  }
}
