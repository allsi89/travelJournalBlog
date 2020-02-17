import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFiveArticlesComponent as DefaultHomeComponent } from './article/list-five-articles/list-five-articles.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { ListTrendingComponent } from './article/list-trending/list-trending.component';
import { ListRecentComponent } from './article/list-recent/list-recent.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DefaultHomeComponent
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
    component: ListTrendingComponent
  },
  {
    path: 'recent',
    pathMatch: 'full',
    component: ListRecentComponent
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
