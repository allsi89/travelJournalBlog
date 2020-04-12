import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  path: string = '/post-images';
  task: UploadTask;;

  ref: AngularFireStorageReference;
  downloadURL: any;

  constructor(
    private fbs: AngularFireStorage
  ) { }

  uploadFile(file) {
    const randomId = Math.random().toString(36).substring(2);
    const name = randomId + file.name;
    const image = { file, name };

    return this.fbs.storage
      .ref()
      .child(`${this.path}/${image.name}`)
      .put(image.file)
      .then(data => data.ref.getDownloadURL())
      .then(url => {
        return {url, name};
      });
  }

  uploadData(data){
    const post = data.post;
    const file = data.file;
    const randomId = Math.random().toString(36).substring(2);
    const name = randomId + file.name;

    const image = { file, name };

    return this.fbs.storage
      .ref()
      .child(`${this.path}/${image.name}`)
      .put(image.file)
      .then(data => data.ref.getDownloadURL())
      .then(url => {
        post.imgUrl = url;
        post.imgName = name;
        return post;
      });
  }

  deleteImg(imgUrl: string) {
    if (!imgUrl) {
      return;
    }
    return this.fbs.storage
    .refFromURL(imgUrl)
    .delete();
  }

}
