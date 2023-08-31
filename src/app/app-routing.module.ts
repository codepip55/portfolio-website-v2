import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { redirectGuard } from './guards/redirect.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },

  // External Links
  { path: 'resume', canActivate: [redirectGuard], data: { externalUrl: "https://cms.pepijncolenbrander.com/uploads/Pepijn_s_Resume_c24cdea195.pdf" }, component: MenuComponent },
  { path: 'privacypolicy', canActivate: [redirectGuard], data: { externalUrl: "https://cms.pepijncolenbrander.com/uploads/PC_Privacy_Policy_4aaa9d89ad.pdf" }, component: MenuComponent },

  // Error Pages
  { path: '404', component: NotFoundComponent },
  /* @bottom */
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
