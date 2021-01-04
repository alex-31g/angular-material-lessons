import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../model/course';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input() courses: ICourse[];

  constructor() { }

  ngOnInit(): void {
  }

}
