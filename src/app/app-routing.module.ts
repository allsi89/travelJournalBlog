import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { AllComponent } from './post/all/all.component';
import { CreateComponent } from './post/create/create.component';
import { InfoComponent } from './post/info/info.component';
import { AllPostsResolver } from './core/resolvers/all-posts.resolver';
import { PostInfoResolver } from './core/resolvers/post-info.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'home',  component: HomeComponent},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user', children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'notifications', component: NotificationsComponent }
    ]
  },
  {
    path: 'post', children:[
      { path: 'all-posts', component: AllComponent, resolve: {postList: AllPostsResolver} },
      { path: 'create', component: CreateComponent },
      { path: 'info/:id', component: InfoComponent, resolve: { post: PostInfoResolver } }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [PostInfoResolver, AllPostsResolver]
})
export class AppRoutingModule { }
