import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/core/services/upload.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      text: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(4000)]]
    })
  }

  createPost() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { title, text } = this.createPostForm.value;

    this.postService.createPost(
      {
        title: title,
        text: text,
        author: user.username,
        uid: user.authId,
        likes: 0, 
        dislikes:  0,
        createdOn: new Date()
      }
    );

    this.router.navigate(['./'])

    // this.createPostForm.reset();
  }

}
