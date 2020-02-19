import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user: any

  @Output() onToggleSidenav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }
}
