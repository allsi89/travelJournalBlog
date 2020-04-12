import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { MatTableDataSource } from '@angular/material/table';
import { Navigator } from 'src/app/core/services/navigator.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() postList: IPost[];

  displayedColumns: string[] = ['createdOn', 'title', 'author'];
  dataSource: MatTableDataSource<IPost>;

  constructor( private navigator: Navigator ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.postList);
  }

  getUserPosts(uid: string) {
    this.navigator.userJournal(uid);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPostInfo(userId: string, id: string) {
    this.navigator.getPostInfo(userId, id);
  }
}
