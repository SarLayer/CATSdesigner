import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectNewsComponent } from './modules/subject-news/subject-news.component';
import { LecturesComponent } from './modules/lectures/lectures.component';



const routes: Routes = [
  // { path: ':subjectId', redirectTo: '/:subjectId/news'},
  { path: ':subjectId/news', component: SubjectNewsComponent},
  { path: ':subjectId/lectures', component: LecturesComponent},
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }