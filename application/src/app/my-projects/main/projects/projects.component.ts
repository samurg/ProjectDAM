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
    if (this._auth.user) {
      this._auth.user.subscribe(u => {
        if (u) {
          this.uid = u.uid;
        }});
    }
   }

  ngOnInit() {
    this._db.getUserProjects(this.uid);
  }

  getProjects(): Project[] {
    return this._db.projects;

  }
}
