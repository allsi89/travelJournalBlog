import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost } from '../../core/interfaces/post';
import { UploadService } from '../../core/services/upload.service';
import { AuthService } from 'src/app/auth/service/auth.service';
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

  /** Create Post In DB */
  createPost(post: IPost) {
    const userId = this.authService.userData.id;

    return this.fireDb.collection(`posts-db/${userId}/posts`)
      .add(post)
      .then(data => {
        return data.id
      });
  }

  /** Fetch All Posts */
  fetchPosts() {
    return this.fireDb.collectionGroup<IPost>('posts', ref => ref.orderBy('createdOn', 'desc'))
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(p => {
            return this.mappedObj(p.payload.doc)
          })
        })
      );
  }

  /** Fetch User Posts */
  fetchUserPosts(userId: string) {
    return this.fireDb.collection<IPost>(`posts-db/${userId}/posts`, ref => ref.orderBy('createdOn', 'desc'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(p => {
            return this.mappedObj(p.payload.doc)
          })
        })
      );
  }

  /** Fetch Single Post By User */
  fetchPostById(userId, postId): Observable<IPost> {
    return this.fireDb.collection<IPost>(`posts-db/${userId}/posts`).doc(postId)
      .snapshotChanges()
      .pipe(
        map(p => {
          return this.mappedObj(p.payload);
        })
      )
  }

  /** Maps the object to IPost */
  private mapObj(o): IPost {
    return <IPost>{
      id: o.id,
      title: o.title,
      author: o.author,
      uid: o.uid,
      createdOn: new Date(),
      likes: o.likes,
      text: o.text,
      imgUrl: o.imgUrl,
      imgName: o.imgName
    };
  }

  /** Request Authorization to edit/delete Post */
  requestPostAuth(post: IPost) {
    if (this.authService.userData.id == post.uid) {
      return true;
    }
    return false;
  }

  /** Like Post - only one like to post per user*/
  likePost(post: IPost, id: string) {
    let likes = post.likes;
    if (!post.likes.includes(id)) {
      likes.push(id);
    } else {
      likes = post.likes.filter(data => data != id)
    }

    return this.fireDb.collection<IPost>(`posts-db/${post.uid}/posts`)
      .doc(post.id)
      .update({ 'likes': likes });
  }

  /** delete post */
  deletePost(post: IPost) {
    const userId = this.authService.userData.id;
    // const imgUrl = post.imgUrl;
    return this.fireDb
      .collection<IPost>(`posts-db/${userId}/posts`)
      .doc(post.id)
      .delete();
  }

  /** map the data received from the DB to IPost */
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