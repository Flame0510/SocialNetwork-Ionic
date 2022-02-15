import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

type User = { nickname: string; phone: string };

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [SMS, CallNumber],
})
export class UsersPage implements OnInit {
  users: User[];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private sms: SMS,
    private toastController: ToastController,
    private callNumber: CallNumber
  ) {}

  async ngOnInit() {
    this.users = (await this.apiService.getUsers()) as User[];
  }

  async successToast(type: string) {
    const toast = await this.toastController.create({
      message:
        type === 'call'
          ? 'Chiamata in corso...'
          : 'Messaggio inviato correttamente!',
      duration: 2000,
      color: 'success',
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

  async errorToast() {
    const toast = await this.toastController.create({
      message: "Errore nell'invio del messaggio, riprova.",
      duration: 2000,
      color: 'error',
    });
    toast.present();
  }

  sendMessage = async ({ phone }: User) => {
    try {
      await this.sms.send(phone, 'Hello world!');
      await this.successToast('message');
    } catch (error) {
      await this.logToast(error + ' - ' + phone);
      //await this.errorToast();
    }
  };

  call = async ({ phone }: User) => {
    try {
      await this.callNumber.callNumber(phone, true);
      await this.successToast('call');
    } catch (error) {
      await this.logToast(error + ' - ' + phone);
      //await this.errorToast();
    }
  };
}
