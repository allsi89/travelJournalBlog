import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState, getPostInfoSelector } from 'src/app/+store';
import { IPost } from 'src/app/core/interfaces/post';
import { Image } from 'src/app/core/interfaces/image';
import { ActivatedRoute } from '@angular/router';
import { PostInfo, PostAuth } from 'src/app/+store/post/actions';
import { ofType } from '@ngrx/effects';
import { ActionTypes } from 'src/app/+store/post/actions';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private _selectedFiles: FileList;
  selectedImg: File;
  editPostForm: FormGroup;
  image: Image;
  post: IPost;
  formattedText: string;
  loaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private navService: NavService,
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    // Create the form
    this.editPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      text: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new PostInfo({ id }));

    this.store.select(getPostInfoSelector)
      .subscribe(data => {
        if (data) {
          this.store.dispatch(new PostAuth(data));
          this.editPostForm.get('title').setValue(data.title);
          this.editPostForm.get('text').setValue(data.text);
          this.post = data;
        }

        this.actionSubject.pipe(ofType(ActionTypes.PostAuthSuccess))
          .subscribe(() => {
            this.loaded = true;
          })
      }, err => console.error(err))

      setTimeout(() => {
        if (!this.post) {
          this.navService.myJournal();
          return;
        }
      }, 4000)

  }


  detectImage(event) {
    this._selectedFiles = event.target.files;
  }

  publishPost() { }
}
