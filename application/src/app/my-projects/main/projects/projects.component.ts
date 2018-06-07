import { Component, OnInit } from '@angular/core';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { AuthService } from '../../../services/firebase/authentication/auth.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  uid: string;
  constructor(private _db: FbdbService, private _auth: AuthService) {
   }

  ngOnInit() {
    if (this._auth.user) {
      this._auth.user.subscribe(u => {
        if (u) {
          this._db.getUserProjects(u.uid);
        }});
    }
  }

  getProjects(): Project[] {
    if (this._db.filterProject === 'all') {
      return this._db.projects;
    } else if (this._db.filterProject === 'created') {
      return this._db.projects.filter(project => project.estado === 'CREATED').map(p => p);
    } else if (this._db.filterProject === 'deployed') {
      return this._db.projects.filter(project => project.estado === 'DEPLOYED').map(p => p);
    }

  }
}
