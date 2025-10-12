import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaladieService } from 'src/Services/maladie.service';

@Component({
  selector: 'app-edit-maladie-component',
  templateUrl: './edit-maladie-component.component.html',
  styleUrls: ['./edit-maladie-component.component.css']
})
export class EditMaladieComponent implements OnInit {
  maladieForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private maladieService: MaladieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.maladieForm = this.fb.group({
      nom_maladie: ['', Validators.required],
      description: ['', Validators.required],
      medicament: ['', Validators.required],
      dosage: ['', Validators.required]
    });
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchMaladie();
  }

  fetchMaladie(): void {
    this.maladieService.getMaladieById(this.id).subscribe({
      next: (response) => {
        this.maladieForm.patchValue(response.maladies);
      },
      error: (error) => {
        console.error('Erreur de récupération de la maladie:', error);
        alert('Erreur de récupération de la maladie.');
      }
    });
  }

  onSubmit(): void {
    if (this.maladieForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.maladieService.updateMaladie(this.id, this.maladieForm.value).subscribe({
      next: () => {
        this.router.navigate(['/maladies']);
      },
      error: (error) => {
        console.error('Erreur lors de la modification de la maladie:', error);
        alert('Erreur lors de la modification de la maladie.');
      }
    });
  }
}