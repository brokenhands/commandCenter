

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../models';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

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
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  
  })

export class GameDetailComponent implements OnInit {
  gameForm: FormGroup;
  gameId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      adminId: ['', Validators.required],
      gameMode: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      startTime: ['', Validators.required],
      autoEnd: [false, Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.gameForm.patchValue(game);
      });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.gameForm.valid) {
      if (this.gameId) {
        this.gameService.updateGame({...this.gameForm.value, _id: this.gameId}).subscribe(() => {
          this.router.navigate(['/admin/games']);
        });
      } else {
        this.gameService.createGame(this.gameForm.value).subscribe(() => {
          this.router.navigate(['/admin/games']);
        });
      }
    }
  }
}
