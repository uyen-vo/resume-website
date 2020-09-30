import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreativeComponent } from './creative/creative.component';
import { DeveloperComponent } from './developer/developer.component';
import { DevItemComponent } from './dev-item/dev-item.component';

import { LightboxComponent } from './lightbox/lightbox.component';
import { AngularResizedEventModule } from 'angular-resize-event';


export class MyHammerConfig extends HammerGestureConfig  {
  overrides = {
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  } as any;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreativeComponent,
    DeveloperComponent,
    DevItemComponent,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularResizedEventModule,
    HammerModule,
  ],
  providers:    [ { 
    provide: HAMMER_GESTURE_CONFIG, 
    useClass: MyHammerConfig 
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
