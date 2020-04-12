import { IAction } from 'src/app/core/interfaces/action';
export const ActionTypes = {
    UploadFile: "[UPLOAD] Upload File",
    UploadFileSuccess: "[UPLOAD] Upload File Success",
    UploadFileFailed: "[UPLOAD] Upload File Failed",
    DeleteFile: "[UPLOAD] Delete File",
    DeleteFileSuccess: "[UPLOAD] Delete File Success",
    DeleteFileFailed: "[UPLOAD] Delete File Failed",

};

export class UploadFile implements IAction<File> {
    type = ActionTypes.UploadFile;
    constructor(public payload: File) { }
}

export class UploadFileSuccess implements IAction<{ url: string, name: string }> {
    type = ActionTypes.UploadFileSuccess;
    constructor(public payload: { url: string, name: string }) { }
}

export class UploadFileFailed implements IAction<{ error: any }> {
    type = ActionTypes.UploadFileFailed;
    constructor(public payload: { error: any }) { }
}

export class DeleteFile implements IAction<string> {
    type = ActionTypes.DeleteFile;
    constructor(public payload: string) { }
}

export class DeleteFileSuccess implements IAction<null> {
    type = ActionTypes.DeleteFileSuccess;
    constructor(public payload: null = null) { }
}

export class DeleteFileFailed implements IAction<{ error: any }> {
    type = ActionTypes.DeleteFileFailed;
    constructor(public payload:{ error: any }) { }
}

export type Actions =
    UploadFile |
    UploadFileSuccess |
    UploadFileFailed |
    DeleteFile |
    DeleteFileSuccess | 
    DeleteFileFailed;