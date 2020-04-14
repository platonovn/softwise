import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppHelloComponent} from '../components/app-hello/app-hello.component';
import {AppFormComponent} from '../components/app-form/app-form.component';
import {AppDataResolverService} from '../services/data-resolver/app-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/hello',
    pathMatch: 'full'
  },
  {
    path: 'hello',
    component: AppHelloComponent
  },
  {
    path: 'form',
    component: AppFormComponent,
    resolve: {response: AppDataResolverService}
  },
  {path: '**', redirectTo: '/hello'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {
}
