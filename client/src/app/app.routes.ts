import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './admin/game-list/game-list.component';
import { GameDetailComponent } from './admin/game-detail/game-detail.component';
import { ParticipationComponent } from './components/participation/participation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: GameDetailComponent },
  { path: 'participations', component: ParticipationComponent },
  { path: 'admin/games', component: GameListComponent },
  { path: 'admin/game/new', component: GameDetailComponent },
  { path: 'admin/game/edit/:id', component: GameDetailComponent },  // Reuse for edit
  //{ path: 'admin/game/delete/:id', component: GameDeleteComponent }  // Optional
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
