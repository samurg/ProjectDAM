import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { Project } from '../../../models/project';
import { DomSanitizer } from '@angular/platform-browser';
import { Token } from '../../../models/token';
import { Crowsale } from '../../../models/crowsale';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  video: any;
  token: Token;
  crowsale: Crowsale;
  loading: boolean;
  constructor(private sanitizer: DomSanitizer, private _route: ActivatedRoute, private _db: FbdbService) {
  }

  ngOnInit() {
    /**
     * Soliciata un proyecto que le llega por la ruta
     */
    this.loading = true;
    this._db.getProject(this._route.snapshot.paramMap.get('key')).subscribe(project => {
      this.project = project;
      this.video = this.transform(project.urlvideo);
      this.getToken(project.idToken);
      this.getCrowsale(project.idCrowsale);
      this.loading = false;
    });
  }

  /**
   * Transforma la url para que permita reproducirlo
   * @param url url del video
   */
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Solicita el token del proyecto
   * @param idToken id Token
   */
  getToken(idToken: string) {
    this.loading = true;
    this._db.getTokenByKey(idToken).subscribe(token => this.token = token);
    this.loading = false;
  }

  /**
   * Solicita el crowsale del proyecto
   * @param idCrowsale id Crowsale
   */
  getCrowsale(idCrowsale: string) {
    this.loading = true;
    this._db.getCrowsaleByKey(idCrowsale).subscribe(crowsale => this.crowsale = crowsale);
    this.loading = false;
  }
}
