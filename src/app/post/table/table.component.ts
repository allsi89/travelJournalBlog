import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { MatTableDataSource } from '@angular/material/table';
import { HelperService } from 'src/app/core/services/helper.service';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() postList: IPost[];

  displayedColumns: string[] = ['createdOn', 'title', 'author'];
  dataSource: MatTableDataSource<IPost>;

  constructor(
    private helper: HelperService,
    private navService: NavService
    ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.postList);
  }

  getUserPosts(post: IPost) {
    this.helper.getUserPosts(post);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPostInfo(id: string) {
    this.navService.getPostInfo(id);
  }
}
