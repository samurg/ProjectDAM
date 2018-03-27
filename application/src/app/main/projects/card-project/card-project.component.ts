import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css']
})
export class CardProjectComponent implements OnInit {
  @Input() proyecto: any;
  constructor() { }

  ngOnInit() {
  }

}
