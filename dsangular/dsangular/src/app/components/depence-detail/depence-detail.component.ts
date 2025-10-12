import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Depense } from 'src/Models/Depense';
import { DepenseService } from 'src/Services/depense.service';

@Component({
  selector: 'app-depence-detail',
  templateUrl: './depence-detail.component.html',
  styleUrls: ['./depence-detail.component.css']
})
export class DepenceDetailComponent {
  depense!: Depense;

  constructor(
    private route: ActivatedRoute,
    private depenseService: DepenseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.depenseService.getDepenseById(id).subscribe((data: Depense) => {
        this.depense = data;
      });
    }
  }

}