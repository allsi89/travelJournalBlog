import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FooterComponent, SideNavComponent, ToolbarComponent, NotFoundComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  exports: [FooterComponent, SideNavComponent, ToolbarComponent, HeaderComponent]
})
export class SharedModule { }

