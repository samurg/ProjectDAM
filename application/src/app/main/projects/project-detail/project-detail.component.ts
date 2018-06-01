import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  constructor(private _route: ActivatedRoute, private _db: FbdbService) {
    this._db.getProject(this._route.snapshot.paramMap.get('key')).forEach( p => {
      this.project = new Project(p.key, p.categoria, p.contractaddress, p.description, p.estado,
        p.fechafin, p.fechainicio, p.finalizado, p.idCrowsale, p.idToken, p.idUser, p.imagen, p.subtitulo, p.titulo, p.urlvideo);
    });
   }

  ngOnInit() {
  }

}
