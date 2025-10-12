import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepenseService } from 'src/Services/depense.service';

@Component({
  selector: 'app-depense-form',
  templateUrl: './depense-form.component.html',
  styleUrls: ['./depense-form.component.css']
})
export class DepenseFormComponent {
  depenseForm!: FormGroup;
  constructor(
    private depenseService: DepenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.depenseForm = new FormGroup({
      id: new FormControl(null),
      description: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      date: new FormControl(null, [Validators.required])
    });
    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.depenseService.getDepenseById(currentId).subscribe((depense) => {
        this.depenseForm.setValue({
          id: depense.id,
          description: depense.description,
          amount: depense.amount,
          date: depense.date
        });
      });
    }
  }

  onSubmit(): void {
    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.depenseService.updatedepense(currentId, this.depenseForm.value).subscribe(() => {
        this.router.navigate(['/depenses']);
      });
    } else {
      this.depenseService.addDepense(this.depenseForm.value).subscribe(() => {
        this.router.navigate(['/depenses']);
      });
    }
  }
}
