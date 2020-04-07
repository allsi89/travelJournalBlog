import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { CreateComponent } from './post/create/create.component';
import { InfoComponent } from './post/info/info.component';
import { PostInfoResolver } from './core/resolvers/post-info.resolver';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { UserPostsComponent } from './post/user-posts/user-posts.component';
import { ListComponent } from './post/list/list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'home',  component: HomeComponent},
  
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  {
    path: 'user', canActivate: [AuthGuard], children: [
      { path: 'posts', component: UserPostsComponent }
      // { path: 'settings', component: SettingsComponent },
      // { path: 'notifications', component: NotificationsComponent }
    ]
  },
  {
    path: 'post', children:[
      { path: 'list', component: ListComponent},
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'info/:id', component: InfoComponent, resolve: { post: PostInfoResolver }, canActivate: [AuthGuard] }
    ]
  },
  { path: '404',  component: NotFoundComponent },
  { path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [PostInfoResolver]
})
export class AppRoutingModule { }
