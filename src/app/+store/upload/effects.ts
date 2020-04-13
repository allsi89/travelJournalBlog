import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes,UploadFile, UploadFileSuccess, UploadFileFailed, DeleteFile, DeleteFileSuccess, DeleteFileFailed } from './actions';
import { map, switchMap } from 'rxjs/operators';
import { UploadService } from 'src/app/core/services/upload.service';

@Injectable({
    providedIn: 'root'
})
export class UploadEffects {
    constructor(
        private actions$: Actions,
        private uploadService: UploadService,
    ) {  }

    @Effect() uploadFile$ = this.actions$.pipe(
        ofType<UploadFile>(ActionTypes.UploadFile),
        map(action => action.payload),
        switchMap(data => {
            return this.uploadService.uploadFile(data)
                .then(data => {
                    // this.helperService.save(data.post)
                    return new UploadFileSuccess(data)
                })
                .catch(err => {
                   return new UploadFileFailed(err);
                })
        })
    );

    @Effect() deleteFile$ = this.actions$.pipe(
        ofType<DeleteFile>(ActionTypes.DeleteFile),
        map(action => action.payload),
        switchMap(url => {
            return this.uploadService.deleteImg(url)
                .then(() => {
                    return new DeleteFileSuccess()
                })
                .catch(err => {
                    return new DeleteFileFailed(err);
                })
        })
    );
}