import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProjectsComponent implements OnInit {
  currentJustify = 'center';
  public proyectos: Observable<any[]>;
  constructor(config: NgbCarouselConfig) {
    config.interval = 2500;
    config.wrap = true; /* vuelta a empezar*/
    config.keyboard = false;
   }

  ngOnInit() {
  }

}
