import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/Models/Patient';

import { RenderVousService } from 'src/Services/render-vous.service';
@Component({
  selector: 'app-add-rendez-vous',
  templateUrl: './add-rendez-vous.component.html',
  styleUrls: ['./add-rendez-vous.component.css']
})
export class AddRendezVousComponent {
  rendezvousForm: FormGroup;
  patients: Patient[] = [];
  loading: boolean = true;
  error: string = '';
  constructor(
    private RVS: RenderVousService,
    private router: Router
  ) {
    this.rendezvousForm = new FormGroup({
      patient_id: new FormControl(null, Validators.required),
      date_time: new FormControl(null, Validators.required),
      montant: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    // Charger la liste des patients filtrés
    this.RVS.getFilteredPatients().subscribe({
      next: (response) => {
        this.patients = response.patients;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors de la récupération des patients.';
        this.loading = false;
      }
    });
  }
  onSubmit(): void {
    this.RVS.addRendezvous(this.rendezvousForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/rendezvous']);
      },
      error: (error) => {
        this.error = 'Erreur lors de l\'ajout du rendez-vous.';
      }
    });
  }
}