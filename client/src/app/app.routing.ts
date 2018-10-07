import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './seguridad/guards/auth.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistracionComponent } from './seguridad/registracion/registracion.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'registracion', component: RegistracionComponent },
    // Sino, redirigir al home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);