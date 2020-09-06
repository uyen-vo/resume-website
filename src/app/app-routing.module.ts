import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreativeComponent } from './creative/creative.component';
import { DeveloperComponent } from './developer/developer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'creative',
      component: CreativeComponent,
    }, {
      path: 'developer',
      component: DeveloperComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
