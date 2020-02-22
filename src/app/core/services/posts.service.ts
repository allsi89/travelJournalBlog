import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 
  // private _post: Post;
  // private _postsList: Post[] = [];
  // private _trendingList: Post[] = [];

  // postChanged = new Subject<Post>();
  // postListChanged = new Subject<Post[]>();
  // trendingListChanged = new Subject<Post[]>();



  constructor(
    private fireDb: AngularFirestore,
    private router: Router,
  ) { }

  fetchPostById(postId: string): Observable<Post>{
   return this.fireDb
      .collection<Post>('posts')
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
      .collection<Post>('posts', ref => ref.orderBy('createdOn', 'desc'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(p => {
            return this.mappedObj(p.payload.doc)
          })
        })
      )
      // .subscribe((posts) => {
      //   this._postsList = posts;
      //   this.postListChanged.next([...this._postsList]);
      // });
  }

  createPost(payload) {
    this.fireDb.collection<Post>('posts').add(payload)
    .then((data) => {
      this.fetchPostById(payload.id)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  private mappedObj(o) {
    return {
      id: o.id,
      title: o.get('title'),
      author: o.get('author'),
      uid: o.get('uid'),
      createdOn: o.get('createdOn').toDate(),
      dislikes: o.get('dislikes'),
      likes: o.get('likes'),
      text: o.get('text')
    }
  }
}
