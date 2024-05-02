import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule] // Import Material modules
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Failed to load users', error)
    });
  }

  loginAs(userName,userId){
    localStorage.setItem('cs_user_name',userName);
    localStorage.setItem('cs_user_id',userId);
    this.snackBar.open(`Logged in as ${userName}`, 'OK',{ duration:3000 });
  }
}
