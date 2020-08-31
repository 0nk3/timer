import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 20,
      innerStrokeWidth: 10,
      titleColor: "#ffffff",
      subtitleColor: "#ffffff",
      space: 1,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      outerStrokeLinecap: "square",
      animationDuration: 300,
      animation: false,
      responsive: true,
      renderOnClick: false,
      backgroundStroke: "transparent",
      clockwise: false,
    }),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
