import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard } from './auth.guard';

// компоненты, которые сопоставляются с маршрутами
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch:"full"},
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
