import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { redirectGuard } from './guards/redirect.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'resume', canActivate: [redirectGuard], data: { externalUrl: "https://cms.pepijncolenbrander.com/uploads/Pepijn_s_Resume_f70f3b988e_e1d85645b8.pdf" }, component: MenuComponent },
  { path: '404', component: NotFoundComponent },
  /* @bottom */
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
