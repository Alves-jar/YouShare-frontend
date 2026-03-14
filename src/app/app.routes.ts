import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Projects } from './pages/projects/projects';
import { CreateProject } from './pages/create-project/create-project';
import { ProjectDetails } from './pages/project-details/project-details';
import { UploadVideo } from './pages/upload-video/upload-video';
import { Notifications } from './pages/notifications/notifications';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'projects', component: Projects, canActivate: [authGuard] },
  { path: 'create-project', component: CreateProject, canActivate: [authGuard] },
  { path: 'project-details/:id', component: ProjectDetails, canActivate: [authGuard] },
  { path: 'upload-video', component: UploadVideo, canActivate: [authGuard] },
  { path: 'notifications', component: Notifications, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
