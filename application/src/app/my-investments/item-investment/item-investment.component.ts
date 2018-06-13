import { Component, OnInit, Input } from '@angular/core';
import { Investment } from '../../models/investment';
import { Project } from '../../models/project';
import { FbdbService } from '../../services/firebase/database/fbdb.service';

@Component({
  selector: 'app-item-investment',
  templateUrl: './item-investment.component.html',
  styleUrls: ['./item-investment.component.css']
})
export class ItemInvestmentComponent implements OnInit {
  @Input() investment: Investment;
  base = 'https://rinkeby.etherscan.io/tx/';
  enlace: string;
  project: Project;
  constructor(private _db: FbdbService) { }

  ngOnInit() {
    this.enlace = this.base + this.investment.txHash;
    this._getProject();
  }

  _getProject() {
    this._db.getProject(this.investment.idProject)
      .subscribe(project => this.project = project);
  }

}
