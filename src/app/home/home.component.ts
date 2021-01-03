import { Component, OnInit } from '@angular/core';
import { ICourse } from "../model/course";
import { COURSES } from "../model/db-data";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses: ICourse[];
  advancedCourses: ICourse[];

  constructor() {

  }

  ngOnInit() {
    // Object.values - возвращает значения свойств объекта в виде массива
    // https://codepen.io/alex_ts/pen/ExgEpZL?editors=0010
    const courses:any = Object.values(COURSES);

    // filter() возвращает новый массив со всеми элементами, прошедшими фильтрацию, задаваемую в передаваемой функции
    // https://codepen.io/alex_ts/pen/ExgEpZL?editors=0010
    this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
    this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
  }

}
