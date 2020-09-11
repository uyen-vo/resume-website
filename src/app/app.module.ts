import { BrowserModule } from '@angular/platform-browser';
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

import { NgScrollbarModule } from 'ngx-scrollbar';
import { LightboxComponent } from './lightbox/lightbox.component';

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
    // NgScrollbarModule.withConfig({
    //   // 'viewClass': 'custom-scroll'
    //   'visibility': 'hover'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
