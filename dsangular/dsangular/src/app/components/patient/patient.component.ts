// filepath: /C:/Users/LENOVO/Desktop/Angular/dsangular/dsangular/src/app/components/patient/patient.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/authentification/auth.service';
import { Patient } from 'src/Models/Patient';
import { PatientService } from 'src/Services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  patients: Patient[] = [];
  currentPage = 1;
  totalPages = 1;
  searchTerm = '';
  pageSize = 10;
  selectedFile: File | null = null;

  constructor(
    private PS: PatientService,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  fetchPatients(): void {
    this.PS.getPatients(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        this.patients = response.patients;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des patients");
        this.snackBar.open('Erreur lors de la récupération des patients', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-error']
        });
      }
    });
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.fetchPatients();
  }

  handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPatients();
    }
  }

  handleDelete(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      this.PS.deletePatient(id).subscribe({
        next: () => {
          this.snackBar.open('Patient supprimé avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-success']
          });
          this.fetchPatients(); // Rafraîchir la liste des patients
        },
        error: (error) => {
          console.error("Erreur lors de la suppression du patient :", error);
          this.snackBar.open('Erreur lors de la suppression du patient', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-error']
          });
        }
      });
    }
  }
  onUpload() {
    if (this.selectedFile) {
      this.PS.importPatients(this.selectedFile).subscribe({
        next: (response) => {
          if (response.errors && response.errors.length > 0) {
            let errorMessage = 'Importation partielle réussie\n. Erreurs:\n';
            response.errors.forEach((error: any) => {
              errorMessage += `Ligne ${error.row}: ${error.error}\n`;
            });
            this.snackBar.open(errorMessage, 'Fermer', {
              duration: 20000,
              panelClass: ['snack-bar-error']
            });
          } else {
            this.snackBar.open('Importation réussie', 'Fermer', {
              duration: 3000,
              panelClass: ['snack-bar-success']
            });
          }
          this.fetchPatients(); // Refresh the patient list
        },
        error: (error) => {
          console.error('Erreur lors de l\'importation', error);
          this.snackBar.open('Erreur lors de l\'importation', 'Fermer', {
            duration: 30000,
            panelClass: ['snack-bar-error']
          });
        }
      });
    } else {
      console.error('Aucun fichier sélectionné');
      this.snackBar.open('Aucun fichier sélectionné', 'Fermer', {
        duration: 3000,
        panelClass: ['snack-bar-error']
      });
    }
  }
}