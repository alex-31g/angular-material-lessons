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
  // елемент ссылку на MatPaginator.
  // Данная ссылка не готова к работе на этапе ngOnInit(),
  // с ней необходимо работать внутри ngAfterViewInit()
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    // this.coursesService.findAllCourseLessons(this.course.id)
    //   .subscribe(lessons => this.dataSource.data = lessons);

    this.dataSource = new LessonsDatasource(this.coursesService);
  }

  ngAfterViewInit() {
    // this.paginator.page - это Observable, который эмитит события,
    // когда юзер будет взаимодействовать с MatPaginator внутри html
    this.paginator.page.pipe(
      // startWith - не дожидаясь получения первого значения от Observable,
      // начинает поток с заданного в startWith значения, то-есть в subscribe()
      // первым попадет то значение, которое мы задали в startWith.
      // Зачем мы используем здесь startWith?
      // MatPaginator начинает эмитить данные только при взаимодействии
      // с юзером, а при первом переходе на страницу с уроками уже
      // необходимо отобразить начальные данные, но они не могут быть получены,
      // так как юзер еще не взаимодействовал с MatPaginator, 
      // а значит и запроса к серверу еще не было.
      // Чтобы выполнить запрос - мы с помощью MatPaginator запускаем поток,
      // вследствии чего сработает следующий за ним оператор tap,
      // который и запустить обращение к серверу
      startWith(null as string),
      tap(() => {
        this.dataSource.loadLessons(this.course.id, '', 'asc', this.paginator.pageIndex, this.paginator.pageSize);
      })
    )
    .subscribe();
  }

  searchLessons(search) {
    // this.dataSource.filter = search.toLocaleLowerCase().trim();
  }

}
