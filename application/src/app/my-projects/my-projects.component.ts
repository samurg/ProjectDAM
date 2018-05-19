import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/firebase/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router ) {
   }

  ngOnInit() {
    if (this.auth.user === undefined) {
      this.router.navigate(['/login']);
    }
  }
}
