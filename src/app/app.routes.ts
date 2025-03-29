import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/eventType/list/list.component';
import { ListLogComponent } from './pages/eventLog/list-log/list-log.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'eventType/list', component: ListComponent },
    {path: 'eventLog/list-log', component: ListLogComponent }
];
