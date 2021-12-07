import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoggedInGuard } from "../guards/logged-in.guard";
import { LoginComponent } from "./pages/login/login.component";
import { SingupComponent } from "./pages/singup/singup.component";



const routes: Routes = [
    {path: 'signup', component: SingupComponent, canActivate: [LoggedInGuard]},
    {path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }