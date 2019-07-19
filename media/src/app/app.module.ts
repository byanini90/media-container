import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MediasComponent } from './components/medias/medias.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MediaComponent } from './components/media/media.component';

//ROUTES
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

//Services
import { MediaService } from './api/services/media.service';
import { InMemoryDb } from './api/models/inMemoryDb';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { MediasQuery } from './api/models/media.query';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MediasComponent,
    FilterComponent,
    NavbarComponent,
    MediaComponent,
    InfiniteScrollComponent
  ],
  entryComponents: [
    MediasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
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
    MediasQuery,
    MediaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
