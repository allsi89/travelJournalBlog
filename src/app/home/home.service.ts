import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  loadArticle(id?:string) {
    // return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users${id? '/${id}' : ''}`);
   }
}
