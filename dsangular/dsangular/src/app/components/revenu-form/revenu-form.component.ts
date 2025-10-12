import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RevenuService } from 'src/Services/revenu.service';

@Component({
  selector: 'app-revenu-form',
  templateUrl: './revenu-form.component.html',
  styleUrls: ['./revenu-form.component.css']
})
export class RevenuFormComponent implements OnInit {
  revenuForm!: FormGroup;

  constructor(
    private revenuService: RevenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.revenuForm = new FormGroup({
      id: new FormControl(null),
      descriptionrev: new FormControl(null, [Validators.required]),
      amountrev: new FormControl(null, [Validators.required, Validators.min(0)]),
      daterev: new FormControl(null, [Validators.required])
    });
    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.revenuService.getRevenueById(currentId).subscribe((revenu) => {
        this.revenuForm.setValue({
          id: revenu.id,
          descriptionrev: revenu.descriptionrev,
          amountrev: revenu.amountrev,
          daterev: revenu.daterev
        });
      });
    }
  }

  onSubmit(): void {
    const currentId = this.route.snapshot.params['id'];
    if (currentId) {
      this.revenuService.updateRevenue(currentId, this.revenuForm.value).subscribe(() => {
        this.router.navigate(['/revenues']);
      });
    } else {
      this.revenuService.addRevenue(this.revenuForm.value).subscribe(() => {
        this.router.navigate(['/revenues']);
      });
    }
  }
}
