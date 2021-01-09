import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Lesson } from "../model/lesson";
import { CoursesService } from "./courses.service";

// Кастомный data source необходимо создавать на базе класса DataSource.
// DataSource предназначен для того, чтобы служить местом для инкапсуляции 
// логики сортировки, фильтрации, разбивки на страницы и извлечения данных.
// DataSource будет передан в таблицу course-компонента.
export class LessonsDatasource implements DataSource<Lesson> {

  // Мы будем использовать BehaviorSubject, чтобы эмитить данные из DataSource.
  // Начальным значением передаем пустой массив
  private lessonSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private coursesService: CoursesService) {}

  loadLessons(
    courseId: number, 
    filter: string, 
    sortDirection: string, 
    pageIndex: number, 
    pageSize: number
  ) {
    this.coursesService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        // catchError() обрабатывает ошибки внутри Observable;
        // обязательно вернуть Observable из catchError().
        // of() создает поток с одним или несколькими элементами, который завершается сразу после их отправки.
        catchError(() => of([]))
      )
      .subscribe(lessons => { 
        // Пушим данные, полученные от сервера, в subject
        this.lessonSubject.next(lessons)
      });
  }

  // Для реализации DataSource необходимо определить два метода:
  // connect и disconnect

  // connect - будет вызываться во время инициализации таблицы.
  // connect должен эмитить массив данных (Observable<Lesson[]>),
  // и таблица будет получать данные от этого Observable,
  // не зная от куда эти данные пришли (инкапсуляция)
  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    // Поскольку мы указали, что connect должен возвращать Observable -
    // используем метод asObservable.
    // asObservable - используется для преобразования subject’а в observable.
    // Таким образом connect будет эмитить данные, которые были запушены в 
    // subject внутри метода loadLessons
    return this.lessonSubject.asObservable();
  }

  // disconnect - будет вызываться когда таблица уничтожена, 
  // чтобы удалить все подписки от Observable
  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonSubject.complete();
  }
}