import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

import { Device } from '@capacitor/device';
import { ToastController } from '@ionic/angular';

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
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    //const socket = io(apiLink);

    //socket.on('connect', () => console.log(socket.id));

    await this.storageService.createStorage();

    //await this.storageService.remove('accessToken');

    /* console.log('ST SERVICE: ', await this.storageService.get('accessToken'));

    console.log('CHECK T: ', await this.authService.checkToken()); */

    try {
      await this.batteryToast(await Device.getBatteryInfo());
    } catch (err) {
      await this.logToast(err);
    }

    this.router.navigate([
      (await this.authService.checkToken()) ? 'feed' : 'sign-in',
    ]);
  }

  async batteryToast({ batteryLevel }: any) {
    const battery = batteryLevel * 100;

    const toast = await this.toastController.create({
      message: 'Batteria: ' + battery + '%',
      duration: 2000,
      color: battery >= 80 ? 'success' : battery >= 20 ? 'warning' : 'danger',
    });
    toast.present();
  }

  async logToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color: 'warning',
    });
    toast.present();
  }
}
