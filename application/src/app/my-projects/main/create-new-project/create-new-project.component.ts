import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { AuthService } from '../../../services/firebase/authentication/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {
  /*Token*/
  initialSupply: number;
  tokenName: string;
  tokenSymbol: string;
  /*Crowsale*/
  fundingGoalInEthers: number;
  durationInMinutes: number;
  etherCostOfEachToken: number;
  /*address ifSuccessfulSendTo,
  address addressOfTokenUsedAsReward*/
  /*Project*/
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video: string;
  cantidadmin: number;
  recompensa: string;
  constructor(private router: Router, private _db: FbdbService, public authService: AuthService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
  }

  /**
   * Guarda el proyecto
   */
  createProject() {
    this.authService.user.subscribe( user => {
      const uidToken = this._createToken(user.uid);
      const uidCrowsale = this._createCrowsale(user.uid);
      const uidProject = this._db.addProyecto(user.uid, this.title, this.subtitle,
        this.description, this.image, this.video, uidToken, uidCrowsale, this.cantidadmin, this.recompensa);
        this._db.addUserProject(user.uid, uidProject);
    });

    this.toastr.success('Project created', 'Success!');
    this.cancel();
  }

  _createToken(user: string): string {
    return this._db.addToken(user, this.initialSupply, this.tokenName, this.tokenSymbol);
  }

  _createCrowsale(user: string): string {
      return this._db.addCrowsale(user, this.fundingGoalInEthers, this.durationInMinutes, this.etherCostOfEachToken);
  }

  cancel() {
    this.router.navigate(['myprojects']);
  }

}
