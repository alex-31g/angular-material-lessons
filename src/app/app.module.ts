import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    TopMenuComponent,
    CoursesCardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
