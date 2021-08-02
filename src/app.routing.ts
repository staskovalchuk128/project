import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from './pages/main/notFound.component';

const routes: Routes = [
  { path: "",
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  { path: '**', component: NotFoundComponent, redirectTo: '' }
]
export const routing = RouterModule.forRoot(routes);
