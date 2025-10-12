import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/Models/Patient';
import { PatientService } from 'src/Services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {

  patient!: Patient;
  constructor(
    private PS: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.PS.getPatientById(id).subscribe((data: Patient) => {
        this.patient = data;
      });
    }
  }
}
