import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyFirebaseModule } from '../firebase.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { PostService } from './service/post.service';
import { UploadService } from '../core/services/upload.service';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [CreateComponent, EditComponent, InfoComponent, CardComponent, UserPostsComponent, ListComponent, TableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MyFirebaseModule,
    SharedModule,
    RouterModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    PostService, UploadService
  ]
})
export class PostsModule { }
