import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.user);
  }
  logoin() {
    /*this.router.navigate(['/']);*/
  }

  logout() {
    this.authService.logout();
    /*this.router.navigate(['/']);*/
  }

}
