import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { IAppState, UploadDataSelector } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { CreatePost } from 'src/app/+store/post/actions';
import { UploadFile } from 'src/app/+store/upload/actions';
import { IPost } from 'src/app/core/interfaces/post';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private _selectedFiles: FileList;
  selectedImg: File;
  createPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private store: Store<IAppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      image: new FormControl(null),
      title: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
      text: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(4000)])
    });
  }

  createPost() {
    if (this._selectedFiles && this._selectedFiles.length > 0) {
      this.selectedImg = this._selectedFiles.item(0);
      const { title, text } = this.createPostForm.value;
      this.dispatchStoreAction(title, text);
    } else {
      this.snackbar.open('Please upload file', 'Close', {
        duration: 3000
      });
      return;
    }
  }

  dispatchStoreAction(title, text) {
    const user = this.authService.userData;
    const post = this.createIPostObj(
      {
        uid: user.id,
        author: user.username,
        imgUrl: null,
        imgName: null,
        title, text
      });

    this.store.dispatch(new UploadFile(this.selectedImg))
    
    setTimeout(() => {
      this.store.select(UploadDataSelector).pipe(
        filter(this.hasValue),
        first()).subscribe(uploadData => {
          post.imgName = uploadData.name;
          post.imgUrl = uploadData.url;
          this.store.dispatch(new CreatePost(post));
        })
    }, 1000)

    this.resetForm();
  }

  private resetForm() {
    this.createPostForm.controls.image.reset();
    this.createPostForm.controls.title.reset();
    this.createPostForm.controls.text.reset();
    this.createPostForm.controls.image.setErrors(null);
    this.createPostForm.controls.title.setErrors(null);
    this.createPostForm.controls.text.setErrors(null);
  }

  detectImage(event) {
    this._selectedFiles = event.target.files;
  }

  private hasValue(value: { url: string, name: string }) {
    return value !== null && value !== undefined;
  }

  private createIPostObj(data): IPost {
    return <IPost>{
      author: data.author,
      uid: data.uid,
      createdOn: new Date(),
      likes: [],
      title: data.title,
      text: data.text,
      imgUrl: data.imgUrl,
      imgName: data.imgName
    }
  }
}
