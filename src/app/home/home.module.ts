import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, 
    CarouselComponent, 
   ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
