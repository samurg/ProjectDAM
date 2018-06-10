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
    this.loading = true;
    this._db.getProject(this._route.snapshot.paramMap.get('key')).subscribe( p => {
      this.project = new Project(
        p.key,
        p.description,
        p.estado,
        p.idCrowsale,
        p.idToken,
        p.idUser,
        p.imagen,
        p.subtitulo,
        p.titulo,
        p.urlvideo);
      this.video = this.transform(p.urlvideo);
      this.getToken(p.idToken);
      this.getCrowsale(p.idCrowsale);
      this.loading = false;
    });
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getToken(idToken: string) {
    this.loading = true;
    this._db.getTokenByKey(idToken).subscribe( token => this.token = token);
    this.loading = false;
  }

  getCrowsale(idCrowsale: string) {
    this.loading = true;
    this._db.getCrowsaleByKey(idCrowsale).subscribe( crowsale => this.crowsale = crowsale);
    this.loading = false;
  }
}
