import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { debounceTime, distinctUntilChanged, startWith, tap, timeout } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { LessonsDatasource } from '../services/lessons.datasourse';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;

  // DELETE:
  // MatTableDataSource предоставляет методы, с помощью которых
  // можно производить sort, paginate и filter массива данных
  // на стороне клиента
  // DataSource будет передан в таблицу
  // dataSource = new MatTableDataSource([]);

  // Указываем, что dataSource должен быть экземпляром кастомного 
  // класса LessonsDatasource, а не MatTableDataSource как ранее,
  // поскольку мы реализовываем server-side фильтрацию данных
  dataSource: LessonsDatasource;

  displayedColumns = ["seqNo", "description", "duration"];

  // С помощью декоратора ViewChild мы получаем из html-шаблона
  // ссылку на MatPaginator.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // С помощью декоратора ViewChild мы получаем из html-шаблона
  // ссылку на MatSort.
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    // this.coursesService.findAllCourseLessons(this.course.id)
    //   .subscribe(lessons => this.dataSource.data = lessons);

    this.dataSource = new LessonsDatasource(this.coursesService);

    // Загрузка данных для таблицы при первом переходе на страницу
    this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
  }

  ngAfterViewInit() {

    // Каждый раз когда юзер взаимодействует с MatSort -
    // отображаем таблицу с pageIndex = 0
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    // this.paginator.page - это Observable, который эмитит события,
    // когда юзер будет взаимодействовать с MatPaginator внутри html
    // this.sort.sortChange - это Observable, который эмитит события,
    // когда юзер будет взаимодействовать с MatSort внутри html
    // С помощью метода merge - объединяем 2 Observable, таким образом
    // при взаимодействии с MatPaginator или с MatSort - 
    // будут выполнятся одинаковые действия
    merge(this.paginator.page, this.sort.sortChange).pipe(
      // MatPaginator начинает эмитить данные при взаимодействии с юзером -
      // производим загрузку данных в зависимости от данных,
      // полученных с потока
      tap(() => {
        this.dataSource.loadLessons(
          this.course.id, 
          '', 
          this.sort.direction, 
          this.paginator.pageIndex, 
          this.paginator.pageSize
        );
      })
    )
    .subscribe();
  }

  searchLessons(search) {
    // this.dataSource.filter = search.toLocaleLowerCase().trim();
  }

}
