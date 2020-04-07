import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes,UploadFile, UploadFileSuccess, UploadFileFailed } from './actions';
import { map, switchMap } from 'rxjs/operators';
import { UploadService } from 'src/app/core/services/upload.service';

@Injectable({
    providedIn: 'root'
})
export class UploadEffects {
    constructor(
        private actions$: Actions,
        private uploadService: UploadService
    ) { 
        
    }

    @Effect() uploadFile$ = this.actions$.pipe(
        ofType<UploadFile>(ActionTypes.UploadFile),
        map(action => action.payload),
        switchMap(data => {
            return this.uploadService.uploadFile(data)
                .then(data => {
                    return new UploadFileSuccess(data)
                })
                .catch(err => {
                    new UploadFileFailed({ error: err })
                })
        })
    );

}