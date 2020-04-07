import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() postList: IPost[];
  @Output() onGetUserPosts = new EventEmitter<IPost>();

  displayedColumns: string[] = ['createdOn', 'title', 'author'];
  dataSource: MatTableDataSource<IPost>;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.postList);
  }

  getUserPosts(post: IPost){
    this.onGetUserPosts.emit(post);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
