import { Component, OnInit } from '@angular/core';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _db: FbdbService) { }

  ngOnInit() {
  }

  /**
   * Modifica el filtro seleccionado
   * @param filter
   */
  setFilter(filter: string) {
    this._db.setFilterProjects(filter);
  }
}
