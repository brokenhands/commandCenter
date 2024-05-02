import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { Game } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { GamePlayerListComponent } from '../game-player-list/game-player-list.component';



@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [RouterModule, MatCardModule, DatePipe, GamePlayerListComponent],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent {
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  gameId: string
  game: Game

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
  
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.game = game
      });
    }
  }
}
