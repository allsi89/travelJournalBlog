import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { CreateComponent } from './post/create/create.component';
import { InfoComponent } from './post/info/info.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { UserPostsComponent } from './post/user-posts/user-posts.component';
import { ListComponent } from './post/list/list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { EditComponent } from './post/edit/edit.component';
import { MyJournalComponent } from './post/my-journal/my-journal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'home',  component: HomeComponent},
  
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  {
    path: 'user', canActivate: [AuthGuard], children: [
      { path: 'journal', component: UserPostsComponent },
      { path: 'my-journal', component: MyJournalComponent }
      // { path: 'settings', component: SettingsComponent },
      // { path: 'notifications', component: NotificationsComponent }
    ]
  },
  {
    path: 'post', children:[
      { path: 'list', component: ListComponent},
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'info/:id', component: InfoComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] }

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
})
export class AppRoutingModule { }
