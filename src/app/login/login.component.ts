import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void  {

    console.log("Local Storage cleared");
    localStorage.removeItem('access_token');
    sessionStorage.clear();
  
  }

  connection(): void{
    this.authService.getAuth();
  }

}
