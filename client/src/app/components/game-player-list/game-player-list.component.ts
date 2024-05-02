import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-players-list',
  templateUrl: './game-player-list.component.html',
  styleUrls: ['./game-player-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule] // Import Material modules
})
export class GamePlayerListComponent implements OnInit {
  users: User[] = [];
  @Input() gameId: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.gameService.getPlayersInGame(this.gameId).subscribe({
      next: (users) => this.users = users.sort((a,b)=>{a.team == b.team}),
      error: (error) => console.error('Failed to load users', error)
    });
  }
  removePlayerFromGame(playerId):void {
    this.gameService.removePlayerFromGame(playerId,this.gameId).subscribe(()=>{
      this.loadPlayers();
    });
  }
}
