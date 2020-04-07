import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost } from '../../core/interfaces/post';
import { UploadService } from '../../core/services/upload.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import 'firebase/storage';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private fireDb: AngularFirestore,
    private uploadService: UploadService,
    private authService: AuthService
  ) { }

  fetchUserPosts(user: IUser) {
    if (!user) {
      user = this.authService.userData;
    }

    return this.fireDb
      .collection<IPost>('posts', ref => ref.where('uid', '==', user.id).orderBy('createdOn', 'desc'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(p => {
            return this.mappedObj(p.payload.doc)
          })
        })
      )
  }

  fetchPostById(postId: string): Observable<IPost> {
    return this.fireDb
      .collection<IPost>('posts')
      .doc(postId)
      .snapshotChanges()
      .pipe(
        map(p => {
          return this.mappedObj(p.payload)
        })
      );
  }

  fetchPosts() {
    return this.fireDb
      .collection<IPost>('posts', ref => ref.orderBy('createdOn', 'desc'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(p => {
            return this.mappedObj(p.payload.doc)
          })
        })
      )
  }

  createPost(data) {
    const post: IPost = {
      author: data.user.username,
      uid: data.user.userId,
      createdOn: new Date(),
      likes: [],
      title: data.title,
      text: data.text,
      imgUrl: data.url
    };
    return this.fireDb.collection<IPost>('posts').add(post);
  }

  likePost(post: IPost, id: string) {
    let likes = post.likes;
    if (!post.likes.includes(id)) {
      likes.push(id);
    } else {
      likes = post.likes.filter(data => data != id)
    }
    return this.fireDb
      .collection<IPost>('posts')
      .doc(post.id)
      .update({ 'likes': likes });
  }

  deletePost(post: IPost) {
    this.fireDb
      .collection<IPost>('posts')
      .doc(post.id)
      .delete()
      .catch(err => console.error(err));

    return this.uploadService.deleteImg(post.imgUrl);
  }

  private mappedObj(o) {
    return <IPost>{
      id: o.id,
      title: o.get('title'),
      author: o.get('author'),
      uid: o.get('uid'),
      createdOn: o.get('createdOn').toDate(),
      likes: o.get('likes'),
      text: o.get('text'),
      imgUrl: o.get('imgUrl'),
      imgName: o.get('imgName')
    }
  }

}