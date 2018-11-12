import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'users-list', loadChildren: './pages/users-list/users-list.module#UsersListPageModule', canActivate: [AuthGuard] },
  { path: 'classes-list', loadChildren: './pages/classes-list/classes-list.module#ClassesListPageModule', canActivate: [AuthGuard] },
  { path: 'user-detail', loadChildren: './pages/user-detail/user-detail.module#UserDetailPageModule', canActivate: [AuthGuard] },
  { path: 'user-edit', loadChildren: './pages/user-edit/user-edit.module#UserEditPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
