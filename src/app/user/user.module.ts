import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyFirebaseModule } from '../firebase.module';




@NgModule({
  declarations: [ProfileComponent, SettingsComponent, NotificationsComponent],
  imports: [
    CommonModule,
    MyFirebaseModule,
    // SharedModule 
  ]
})
export class UserModule { }
