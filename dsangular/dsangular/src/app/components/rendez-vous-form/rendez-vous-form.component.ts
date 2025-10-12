import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rendez-vous-form',
  templateUrl: './rendez-vous-form.component.html',
  styleUrls: ['./rendez-vous-form.component.css']
})
export class RendezVousFormComponent {
  rendezVousForm: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.rendezVousForm = this.fb.group({
      date_time: ['', Validators.required],
      montant: ['', Validators.required]
    });
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.fetchRendezVous();
  }

  fetchRendezVous(): void {
    this.http.get<any>(`http://127.0.0.1:8000/api/rendezVous/${this.id}`)
      .subscribe(
        (response) => {
          this.rendezVousForm.patchValue({
            date_time: response.date_time,
            montant: response.montant
          });
        },
        (error) => alert('Erreur de récupération du rendez-vous.')
      );
  }

  onSubmit(): void {
    if (this.rendezVousForm.valid) {
      this.http.put(`http://127.0.0.1:8000/api/rendezVous/${this.id}`, this.rendezVousForm.value)
        .subscribe(
          () => this.router.navigate(['/rendezvous']),
          (error) => alert('Erreur lors de la modification du rendez-vous.')
        );
    }
  }
}