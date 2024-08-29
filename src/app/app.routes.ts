import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';

export const routes: Routes = [

    {path:"",component:UsersComponent},
    {path:"addUser", component:AddUserComponent}
];
