import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { CenterComponent } from '../center/center.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CenterComponent, PlayerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  token:string;
  items:Array<any> = [];

  constructor(private router:Router, private route: ActivatedRoute, 
    private authService: AuthService) { 
  }

  ngOnInit() { 

    this.authService.getAccessToken();
  }
    


      // for (let item of response['items']) {
      //   this.items.push(
      //     {
      //       name:item['name'],
      //       id:item['id']
      //     }
      //   )
      // }

}