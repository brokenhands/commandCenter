import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { Game, User } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { GamePlayerListComponent } from '../game-player-list/game-player-list.component';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, DatePipe, GamePlayerListComponent,MatSelectModule,ReactiveFormsModule],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent {
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ){}
  gameId: string
  game: Game
  playerForm: FormGroup;
  users:User[];

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
  
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.game = game
      });
    }
    this.playerForm = this.fb.group({playerId:[],team:[]});
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users.filter(user => !user.deleted), // Assuming 'deleted' field marks soft-deleted users
      error: (err) => console.error('Error loading users:', err)
    });

  }

  onSubmit(event: Event): void {
    event.preventDefault();
        this.gameService.addPlayerToGame(this.playerForm.value['playerId'], this.gameId,this.playerForm.value['team']).subscribe(() => {
          this.router.navigate(['/admin/games']);
        });
  }
}
