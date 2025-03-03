import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./components/teacher-list/teacher-list.component').then((m)=>m.TeacherListComponent)
    },
    {
        path:'teacher',
        loadComponent:()=>import('./components/teacher-form/teacher-form.component').then((m)=>m.TeacherFormComponent)
    },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}