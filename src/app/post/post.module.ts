import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyFirebaseModule } from '../firebase.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { AllComponent } from './all/all.component';
import { PostsService } from '../core/services/posts.service';

@NgModule({
  declarations: [CreateComponent, EditComponent, InfoComponent, AllComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MyFirebaseModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
