import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentification/auth.service';
import { Maladie } from 'src/Models/Maladie';
import { MaladieService } from 'src/Services/maladie.service';

@Component({
  selector: 'app-maladie',
  templateUrl: './maladie.component.html',
  styleUrls: ['./maladie.component.css']
})
export class MaladieComponent {
  maladies: Maladie[] = [];
  currentPage = 1;
  totalPages = 1;
  selectedNom_maladie = '';
  selectedName = '';
  isAdmin = false;
  pageSize = 10;

  constructor(private maladieService: MaladieService, private router: Router,public authService: AuthService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('user');
    if (role === 'admin') this.isAdmin = true;
    this.fetchMaladies();
  }

  fetchMaladies(): void {
    this.maladieService.getMaladies(this.currentPage, this.pageSize, this.selectedNom_maladie, this.selectedName).subscribe({
      next: (response:any) => {
        const Data= response.maladies.map((item: any) => ({
          ...item,
          patient_nom: item.patient.nom,
          patient_prenom: item.patient.prenom,
        }));
        this.totalPages = response.totalPages || 1;
        this.maladies = Data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des maladies', error);
        this.maladies = [];
      }
    });
  }



  handleDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette maladie ?')) {
      this.maladieService.deleteMaladie(id).subscribe({
        next: () => {
          alert('Maladie supprimée avec succès !');
          this.fetchMaladies(); // Rafraîchir la liste après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la maladie :', error);
          alert('Erreur lors de la suppression de la maladie.');
        }
      });
    }
  }




  handlePageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchMaladies();
    }
  }

  onSearchNomMaladie(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedNom_maladie = target.value;
    this.currentPage = 1;
    this.fetchMaladies();
  }

  onSearchName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedName = target.value;
    this.currentPage = 1;
    this.fetchMaladies();
  }
}