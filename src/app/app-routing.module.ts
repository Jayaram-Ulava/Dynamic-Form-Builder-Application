import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { FormListComponent } from './Components/form-list/form-list.component';
import { FormBuilderComponent } from './Components/form-builder/form-builder.component';
import { FormFillerComponent } from './Components/form-filler/form-filler.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [ 
    { path: 'login', component: LoginComponent },
  { path: '', component: FormListComponent, canActivate: [AuthGuard] },
  { path: 'builder/:id', component: FormBuilderComponent, canActivate: [AuthGuard, AdminGuard] }, // edit by id
  { path: 'builder', component: FormBuilderComponent, canActivate: [AuthGuard, AdminGuard] }, // new
  { path: 'fill/:id', component: FormFillerComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
