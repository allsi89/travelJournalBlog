import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { UserPosts, PostInfo } from 'src/app/+store/post/actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() postList: IPost[];

  displayedColumns: string[] = ['createdOn', 'title', 'author'];
  dataSource: MatTableDataSource<IPost>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.postList);
  }

  getUserPosts(post: IPost) {
    const user = { id: post.uid, username: post.author, email: null };
    this.store.dispatch(new UserPosts(user));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPostInfo(id: string) {
    this.store.dispatch(new PostInfo({id}));
  }
}
