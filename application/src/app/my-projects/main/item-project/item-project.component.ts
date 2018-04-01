import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.css']
})
export class ItemProjectComponent implements OnInit {
  @Input() project: Project;
  constructor() {
   }

  ngOnInit() {
  }

}
