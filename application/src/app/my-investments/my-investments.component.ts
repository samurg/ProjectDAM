import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/firebase/authentication/auth.service';
import { Router } from '@angular/router';
import { FbdbService } from '../services/firebase/database/fbdb.service';
import { Investment } from '../models/investment';

@Component({
  selector: 'app-my-investments',
  templateUrl: './my-investments.component.html',
  styleUrls: ['./my-investments.component.css']
})
export class MyInvestmentsComponent implements OnInit {

  public investments: Investment[];
  constructor(private _auth: AuthService, private router: Router, private _db: FbdbService) {
  }

 ngOnInit() {
   /** Para acceder a este modulo hay que estar registrado */
   if (this._auth.user === undefined) {
     this.router.navigate(['/login']);
   } else {
    this.getInvestments();
   }
 }

 getInvestments() {
   this._auth.user.subscribe((user) => {
     this._db.getInvesmentsByUser(user.uid).subscribe(investments => {
      this.investments = investments;
     });
    });
 }
}
