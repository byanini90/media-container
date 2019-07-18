import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MediasComponent } from './components/medias/medias.component';

export const ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'media', component: MediasComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
