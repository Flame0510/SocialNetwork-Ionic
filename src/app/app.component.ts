import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.storage.create();

    //await this.storage.remove('accessToken');

    console.log(this.authService.checkToken());
    

    this.router.navigate([this.authService.checkToken() ? 'feed' : 'sign-in']);
  }
}
