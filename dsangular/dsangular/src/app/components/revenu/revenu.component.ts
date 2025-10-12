import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentification/auth.service';
import { Revenu } from 'src/Models/Revenu';
import { RevenuService } from 'src/Services/revenu.service';

@Component({
  selector: 'app-revenu',
  templateUrl: './revenu.component.html',
  styleUrls: ['./revenu.component.css']
})
export class RevenuComponent {
  revenues: Revenu[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  isAdmin = false;
  constructor(
    private revenueService: RevenuService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('user');
    if (role === 'admin') this.isAdmin = true;
    this.fetchRevenues();
  }
fetchRevenues(): void {
  this.revenueService.getRevenues(this.currentPage, this.pageSize).subscribe({
    next: (response) => {
      this.revenues = response.data;
      this.totalPages = response.last_page;
    },
    error: (error) => {
      console.error('Erreur de récupération:', error);
    }
  });
}
handleDelete(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette revenue ?')) {
    this.revenueService.deleteRevenue(id).subscribe({
      next: () => {
        alert('Revenue supprimée avec succès.');
        this.fetchRevenues(); // Rafraîchir la liste après suppression
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la revenue.');
      }
    });
  }
}

handlePageChange(pageNumber: number): void {
  if (pageNumber >= 1 && pageNumber <= this.totalPages) {
    this.currentPage = pageNumber;
    this.fetchRevenues();
  }
}
}