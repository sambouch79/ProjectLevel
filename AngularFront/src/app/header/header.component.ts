import { Component, OnInit } from '@angular/core';
import { authService } from '../services/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggled = false;
  constructor(public authService: authService) { }

  ngOnInit(): void {

  }



}
