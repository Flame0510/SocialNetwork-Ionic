import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

const { apiLink } = environment;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const socket = io(apiLink);

    socket.on('connect', () => console.log(socket.id));

    await this.storageService.createStorage();

    //await this.storageService.remove('accessToken');

    /* console.log('ST SERVICE: ', await this.storageService.get('accessToken'));

    console.log('CHECK T: ', await this.authService.checkToken()); */

    this.router.navigate([await this.authService.checkToken() ? 'feed' : 'sign-in']);
  }
}
