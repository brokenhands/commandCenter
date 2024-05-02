import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-join-team-code',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './join-team-code.component.html',
  styleUrl: './join-team-code.component.scss'
})
export class JoinTeamCodeComponent  implements OnInit{
  public joinQRCode: string;

  constructor(private route:ActivatedRoute){}

  gameId:string;
  team:string;

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.team = this.route.snapshot.paramMap.get('team');

    this.joinQRCode = `/games/join-game/${this.gameId}/${this.team}`
  }

}
