import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { MaladieService } from 'src/Services/maladie.service';

@Component({
  selector: 'app-view-maladie-component',
  templateUrl: './view-maladie-component.component.html',
  styleUrls: ['./view-maladie-component.component.css']
})
export class ViewMaladieComponentComponent {
  maladie: any;

  constructor(
    private route: ActivatedRoute,
    private maladieService: MaladieService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.fetchMaladie(id);
  }

  fetchMaladie(id: number): void {
    this.maladieService.getMaladieById(id).subscribe({
      next: (response) => {
        this.maladie = response.maladies;
      },
      error: (error) => {
        console.error('Erreur de récupération de la maladie:', error);
        alert('Erreur de récupération de la maladie.');
      }
    });
  }

 // Méthode pour télécharger les détails de la maladie en PDF
 downloadPDF() {
  const doc = new jsPDF();

  // Ajouter un titre
  doc.setFontSize(18);
  doc.text('Détails de la Maladie', 20, 20);

  // Ajouter les détails de la maladie
  doc.setFontSize(12);
  doc.text(`Nom de la Maladie: ${this.maladie.nom_maladie}`, 20, 30);
  doc.text(`Patient: ${this.maladie.patient.nom} ${this.maladie.patient.prenom}`, 20, 40);
  doc.text(`Médicament: ${this.maladie.medicament}`, 20, 50);
  doc.text(`Dosage: ${this.maladie.dosage}`, 20, 60);
  doc.text(`Description: ${this.maladie.description}`, 20, 70);

  // Enregistrer le fichier PDF
  doc.save(`${this.maladie.nom_maladie}_details.pdf`);
}

  
}