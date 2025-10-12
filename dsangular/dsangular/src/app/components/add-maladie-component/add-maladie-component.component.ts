import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaladieService } from 'src/Services/maladie.service';
import { PatientService } from 'src/Services/patient.service';

@Component({
  selector: 'app-add-maladie-component',
  templateUrl: './add-maladie-component.component.html',
  styleUrls: ['./add-maladie-component.component.css']
})

export class AddMaladieComponent implements OnInit {
  maladieForm: FormGroup;
  patients: any[] = [];
  loading = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private maladieService: MaladieService,
    private patientService: PatientService,
    private router: Router
  ) {
    this.maladieForm = this.fb.group({
      patient_id: ['', Validators.required],
      nom_maladie: ['', Validators.required],
      description: ['', Validators.required],
      medicament: ['', Validators.required],
      dosage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getFilteredPatients().subscribe({
      next: (response) => {
        this.patients = response.patients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des patients:', error);
        this.error = 'Erreur lors de la récupération des patients.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.maladieForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.maladieService.addMaladie(this.maladieForm.value).subscribe({
      next: (response) => {
        console.log('Maladie ajoutée:', response);
        this.router.navigate(['/maladies']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la maladie:', error);
        alert('Erreur lors de l\'ajout de la maladie.');
      }
    });
  }
}
