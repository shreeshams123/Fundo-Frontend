import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'notes',
        component: NotesContainerComponent
      },
      {
        path: 'archive',
        component: ArchiveContainerComponent
      },
      {
        path: "trash",
        component: TrashContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
