import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentification/auth.service'; // Ensure this service is implemented

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName: string = 'Inconnu';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
 
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    } else {
      this.authService.profile().subscribe(
        (response: any) => {
          if (response?.name) {
            this.userName = response.name;
            localStorage.setItem('userName', response.name);
          }
        },
        (error) => {
          console.error('Error fetching profile:', error);
        }
      );
    }
  }

 
}
