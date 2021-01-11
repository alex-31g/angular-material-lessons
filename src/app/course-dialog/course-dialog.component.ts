import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit {

  description: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,

    // Инжектим MatDialogRef, который принимает параметр, который
    // соответствует компоненту, в котором находится тело dialog-окна
    private dialogRef: MatDialogRef<CourseDialogComponent>,

    // Чтобы получить данные dialogConfig.data, которые были отправлены 
    // из courses-card-list компонента методом editCourse,
    // нам необходимо заинжектить MAT_DIALOG_DATA
    @Inject(MAT_DIALOG_DATA) { description, longDescription, category }: Course // <-- 1 вариант
    // @Inject(MAT_DIALOG_DATA) data: Course // <-- 2 вариант (более понятная запись строки выше)

  ) {
    this.description = description; // <-- 1
    // this.description = data.description; // <-- 2

    this.form = fb.group({
      description: [description, Validators.required],
      category: [category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [longDescription, Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    // закрываем dialog-окно и передаем данные формы,
    // которые будут получены в course-card-list компоненте
    this.dialogRef.close(this.form.value);
  }

  close() {
    // закрываем dialog-окно
    this.dialogRef.close();
  }
}
