import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NoAuthGuard } from './core/no-auth.guard';
import { NoAuthGuardAdmin } from './core/no-auth-admin.guard';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RegisterComponent } from './register/register.component';
import { ProgressControlComponent } from './progress-control/progress-control.component';
import { AboutComponent } from './about/about.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full'
  },
  {
    path: 'web',
    component: ContentLayoutComponent,
    canActivate: [NoAuthGuard],
    children: [  
      {
        path: '',
        loadChildren: () => import("./modules/main/main.module").then(m => m.MainModule)
      },    
      {
        path: 'viewer',
        loadChildren: () => import("./modules/viewer/viewer.module").then(m => m.ViewerModule)
      },
      { 
        path: 'confirmation', 
        component: ConfirmationComponent
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ResetComponent },
  { path: 'progControl', component: ProgressControlComponent },
  { 
    path: 'adminPanel', 
    component: AdminComponent,
    //canActivate: [NoAuthGuardAdmin],
  },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
