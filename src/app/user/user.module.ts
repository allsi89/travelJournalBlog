import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ArticlesComponent } from './articles/articles.component';



@NgModule({
  declarations: [ProfileComponent, SettingsComponent, NotificationsComponent, ArticlesComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
