import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState, getPostInfoSelector } from 'src/app/+store';
import { IPost } from 'src/app/core/interfaces/post';
import { Image } from 'src/app/core/interfaces/image';
import { ActivatedRoute } from '@angular/router';
import { PostInfo } from 'src/app/+store/post/actions';
import { Navigator } from 'src/app/core/services/navigator.service';
import { AuthService } from 'src/app/auth/service/auth.service';

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
    // private navigator: Navigator,
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    // Create the form
    this.editPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      text: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.authService.userData.id;

    this.store.dispatch(new PostInfo({ userId, id }));

    this.store.select(getPostInfoSelector)
      .subscribe(data => {
        if (data) {
          this.editPostForm.get('title').setValue(data.title);
          this.editPostForm.get('text').setValue(data.text);
          this.post = data;
          this.loaded = true;
        }
      }, err => console.error(err))
  }

  detectImage(event) {
    this._selectedFiles = event.target.files;
  }

  publishPost() { }
}
