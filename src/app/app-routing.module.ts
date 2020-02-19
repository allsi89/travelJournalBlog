import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { TrendingComponent } from './home/trending/trending.component';
import { RecentComponent } from './home/recent/recent.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ArticlesComponent
  },
  {
    path: 'user/profile',
    component: ProfileComponent
  },
  {
    path: 'user/settings',
    component: SettingsComponent
  },
  {
    path: 'user/notifications',
    component: NotificationsComponent
  },
  {
    path: 'user/:id',
    component: ProfileComponent
  },
  {
    path: 'trending',
    pathMatch: 'full',
    component: TrendingComponent
  },
  {
    path: 'recent',
    pathMatch: 'full',
    component: RecentComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
