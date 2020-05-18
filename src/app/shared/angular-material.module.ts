import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatGridListModule,
  MatDialogModule,
  MatBadgeModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,
  MatStepperModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class AngularMaterialModule {}
