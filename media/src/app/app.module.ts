import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MediasComponent } from './components/medias/medias.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { MediaComponent } from './components/media/media.component';
import { MediaService } from './api/services/media.service';
import { InMemoryDb } from './api/services/InMemoryDb';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MediasComponent,
    FilterComponent,
    NavbarComponent,
    MediaComponent
  ],
  entryComponents: [
    MediasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDb, { delay: 2500}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    InMemoryDb,
    MediaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
