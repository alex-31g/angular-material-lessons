import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  // Инжектим MatDialog
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  // При клике EDIT - срабатывает метод editCourse
  editCourse({ description, longDescription, category }: Course) {
    // Объект конфигурации для dialog-окна
    const dialogConfig = new MatDialogConfig();

    // autoFocus - поместить фокус на первый элемент формы
    dialogConfig.autoFocus = true;
    dialogConfig.data = { description, longDescription, category };
    
    // open - открывает dialog-окно.
    // 1й параметр - имя компонента, который должен быть открыт;
    // 2й параметр - объект конфигурации, который будет получен внутри CourseDialogComponent.
    // open() возвращает экземпляр MatDialogRef, с помощью которого можно закрыть окно 
    // с помощью метода dialogRef.close (см. course-dialog компонент),
    // а также с помощью метода dialogRef.afterClosed - получить данные формы
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    // Получаем данные формы, после её закрытия в course-dialog компоненте
    dialogRef.afterClosed().subscribe(
      val => console.log('Dialog output', val)
    )
  }
}
