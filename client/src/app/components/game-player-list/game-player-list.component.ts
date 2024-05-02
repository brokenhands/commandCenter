import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-players-list',
  templateUrl: './game-player-list.component.html',
  styleUrls: ['./game-player-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule] // Import Material modules
})
export class GamePlayerListComponent implements OnInit {
  users: User[] = [];
  @Input() gameId: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getPlayersInGame(this.gameId).subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Failed to load users', error)
    });
  }
}
