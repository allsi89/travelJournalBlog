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

  uploadFile(file: File) {
    const randomId = Math.random().toString(36).substring(2);
    const name = randomId + file.name;
    const image = { file, name };

    return this.fbs.storage
      .ref()
      .child(`${this.path}/${image.name}`)
      .put(image.file)
      .then(data => {
        return data.ref.getDownloadURL()
          .then(url => {
            return {url, name};
          })
      });
  }

  deleteImg(imgName: string) {
    if (!imgName) {
      return;
    }
    return this.fbs.storage
    .ref()
    .child(`${this.path}/${imgName}`)
    .delete()
    .then(res=> {
      console.log(res)
    })
    .catch(err => console.error(err.message));

  //  return this.fbs.storage
  //     .refFromURL(imgUrl)
  //     .delete()
  //     .then(res=> {
  //       console.log(res)
  //     })
  //     .catch(err => console.error(err.message));
  }

}
