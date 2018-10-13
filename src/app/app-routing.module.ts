import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'users-list', loadChildren: './pages/users-list/users-list.module#UsersListPageModule' },
  { path: 'classes-list', loadChildren: './pages/classes-list/classes-list.module#ClassesListPageModule' },
  { path: 'user-detail', loadChildren: './pages/user-detail/user-detail.module#UserDetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
