import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatButtonModule,DatePipe],
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.scss'
})
export class JoinGameComponent implements OnInit{
  gameId:string;
  team:string;
  game:Game;
  playerId:string;

  constructor(private route:ActivatedRoute, private gameService:GameService, private router:Router, 
    public snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.team = this.route.snapshot.paramMap.get('team');
    this.playerId = localStorage.getItem('cs_user_id');

    if(!this.playerId){
      this.router.navigate(['/','admin','games','view',this.gameId]);
    }
    
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.game = game
      });
    }
  }

  confirmJoin(){
    this.gameService.addPlayerToGame(this.playerId,this.gameId,this.team).subscribe({
      next:()=>{
        this.router.navigate(['admin','game','view',this.gameId]);
        this.snackBar.open(`Successfully joined ${this.team} team!`, 'Close', { duration: 3000 });
     },
      error: (err:Error) => {
        console.error('Failed to join:', err);
        this.snackBar.open('Error joining team', 'Close', { duration: 3000 });
      }
    });
  }  
}
