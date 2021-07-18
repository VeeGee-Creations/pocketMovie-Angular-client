import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProfileComponentComponent } from '../profile-component/profile-component.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: string | null = null
  constructor(
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  openProfileDialog() {
    this.dialog.open(ProfileComponentComponent, {
      width: '280px'
    });
  }
}
