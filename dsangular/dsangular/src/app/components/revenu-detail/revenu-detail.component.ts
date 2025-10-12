import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Revenu } from 'src/Models/Revenu';
import { RevenuService } from 'src/Services/revenu.service';

@Component({
  selector: 'app-revenu-detail',
  templateUrl: './revenu-detail.component.html',
  styleUrls: ['./revenu-detail.component.css']
})
export class RevenuDetailComponent implements OnInit {
  revenue!: Revenu;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private RS: RevenuService,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.RS.getRevenueById(id).subscribe((data: Revenu) => {
        this.revenue = data;
      });
    }
  }
}