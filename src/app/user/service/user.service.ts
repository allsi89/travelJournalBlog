import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/core/interfaces/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'firebase/storage';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private fireDb: AngularFirestore
  ) { }

  createUserInDb(user: IUser) {
    return this.fireDb.collection<IUser>('users')
      .doc(user.id)
      .set(user)
  }

  getUserById(userId: string): Observable<IUser> {
    return this.fireDb.collection<IUser>('users')
      .doc(userId)
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.payload
        }),
        map(user => {
          return <IUser>{
            id: user.get('id'),
            username: user.get('username'),
            email: user.get('email')
          }
        })
      );
  }

}
