import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Image } from 'src/app/core/interfaces/image';
import { IPost } from 'src/app/core/interfaces/post';
import { IAppState, getAuthUser, getUploadUrl, getCreatedPostIdSelector } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { first, filter } from 'rxjs/operators';
import { CreatePost, PostInfo } from 'src/app/+store/post/actions';
import { UploadFile } from 'src/app/+store/upload/actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _selectedImages: FileList;
  selectedImg: File;
  createPostForm: FormGroup;
  image: Image;
  post: IPost;
  formattedText: string;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      text: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]]
    })
  }

  createPost() {
    if (!this._selectedImages) {
      this.snackbar.open('Please upload file', 'Undo', {
        duration: 3000
      });
      return;
    }

    this.selectedImg = this._selectedImages[0];
    const { title, text } = this.createPostForm.value;
    this.formattedText = this.formatText(text);

    this.dispatchAction(title);
  }

  dispatchAction(title) {

    this.store.select(getAuthUser)
    .subscribe(user => {
      this.store.dispatch(new UploadFile(this.selectedImg));
      this.store.select(getUploadUrl)
        .pipe(
          filter(this.hasValue),
          first())
        .subscribe(url => {
          const data = { user, url, title, text: this.formattedText };
          this.store.dispatch(new CreatePost(data));
          this.store.select(getCreatedPostIdSelector)
          .subscribe(id => {
            this.store.dispatch(new PostInfo({id}))
          }, error => console.log(error()));
        })
    }, error => console.log(error()));

  }

  detectImage(event) {
    this._selectedImages = event.target.files;
  }

  hasValue(value: string) {
    return value !== null && value !== undefined;
  }

  formatText(text: string) {
    return text
    .split('\n')
    .map(elem => {
      if(!elem){
        return '<br>';
      } else {
        return  '<p>'.concat(elem, '</p>');
      }
    })
    .join('');
  }
}
