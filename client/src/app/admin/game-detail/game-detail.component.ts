import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule  // Needed for datepicker
  ]
})

export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  gameId: string | null = null;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.game = game;
      });
    }
  }

  submitForm(): void {
    if (this.game) {
      if (this.gameId) {
        this.gameService.updateGame(this.game).subscribe(() => {
          this.router.navigate(['/admin/games']);
        });
      } else {
        this.gameService.createGame(this.game).subscribe(() => {
          this.router.navigate(['/admin/games']);
        });
      }
    }
  }
}
