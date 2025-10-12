import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/Models/Patient';
import { PatientService } from 'src/Services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  patientForm!: FormGroup;
  ngOnInit(): void {
    this.patientForm = new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      date_naissance: new FormControl(null, [Validators.required]),
      adresse: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{8,15}$')]),
    });

    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.patientService.getPatientById(currentId).subscribe((patient: Patient) => {
        this.patientForm.setValue({
          id: patient.id,
          nom: patient.nom,
          prenom: patient.prenom,
          date_naissance: patient.date_naissance,
          adresse: patient.adresse,
          telephone: patient.telephone,
        });
      });
    }
  }

  onSubmit(): void {
    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.patientService.updatePatient(currentId, this.patientForm.value).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    } else {
      this.patientService.addPatient(this.patientForm.value).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    }
  }
}

