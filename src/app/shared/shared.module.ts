import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstDirDirective } from './first-dir.directive';


@NgModule({
  declarations: [
    FirstDirDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FirstDirDirective
  ]
})
export class SharedModule { }
