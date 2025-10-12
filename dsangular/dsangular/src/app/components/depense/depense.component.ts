import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentification/auth.service';
import { Depense } from 'src/Models/Depense';
import { DepenseService } from 'src/Services/depense.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent {
  depences: Depense[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  isAdmin = false;
  constructor(
    private depenseService: DepenseService,
    private router: Router,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const role = localStorage.getItem('user');
    this.isAdmin = role === 'admin';
    this.fetchDepenses();
  }
  fetchDepenses(): void {
    this.depenseService.getdepenses(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.depences = response.data;
        this.totalPages = response.last_page;
      },
      error: (error) => {
        console.error('Erreur de récupération:', error);
      }
    });
  }
  handleDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      this.depenseService.deletedepence(id).subscribe({
        next: () => {
          alert('Dépense supprimée avec succès.');
          this.fetchDepenses(); // Rafraîchir la liste après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de la dépense.');
        }
      });
    }
  }

  handlePageChange(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.fetchDepenses();
    }
  }
}