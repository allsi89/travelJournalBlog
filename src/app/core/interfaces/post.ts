export interface IPost{
    id?: string,
    author: string,
    uid: string,
    createdOn: Date,
    likes: Array<string>,
    title: string,
    text: string,
    imgUrl: string
}