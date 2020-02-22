import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';

// import { MatSnackBar } from '@angular/material/snack-bar';
// import {MatExpansionModule} from '@angular/material/expansion';


const modules = [
  MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule,
    MatRadioModule
    // MatSnackBar
    // MatExpansionModule
]

@NgModule({
  declarations: [],
  imports: [...modules],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [...modules]
})
export class MaterialModule { }
