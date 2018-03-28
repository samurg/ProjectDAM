import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { Project } from '../../../models/project';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProjectsComponent implements OnInit {
  currentJustify = 'center';
  public proyectos: Observable<Project[]>;
  constructor(config: NgbCarouselConfig, private _db: FbdbService) {
    config.interval = 2500;
    config.wrap = true; /* vuelta a empezar*/
    config.keyboard = false;
   }

  ngOnInit() {
    this.proyectos = this._db.getAllProjects();
  }

}