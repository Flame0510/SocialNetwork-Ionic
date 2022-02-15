import { IChat } from './../../../models/chat';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatId: string;

  message = new FormControl();

  chat: any | IChat | Partial<IChat> | undefined;

  userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.getUserData();
    this.getChat();
    this.joinChat();

    setInterval(() => {
      this.getChat();
    }, 1000);
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: "Errore nell'invio del messaggio, riprova.",
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  getUserData = async () => {
    try {
      this.userData = await this.apiService.me();
    } catch (err) {
      console.log(err);
    }
  };

  getChat = async () => {
    try {
      this.chat = await this.apiService.getChat(this.chatId);
    } catch (error) {
      console.log(error);
    }
  };

  joinChat = async () => {
    try {
      this.chat = await this.apiService.joinChat(this.chatId);
    } catch (error) {
      console.log(error);
    }
  };

  send = async () => {
    try {
      const message = await this.apiService.sendMessage(
        this.chatId,
        this.message.value
      );

      /* const date = new Date()
        .toLocaleString()
        .split('/')
        .join('-')
        .split(',')
        .join(' - '); */

      console.log(message);

      this.getChat();

      //this.chat.messages.push(message);
      /* 
        message: this.message.value,
        creator: {
          nickname: this.userData.nickname,
          id: this.userData.id,
        },
        id: '1',
        date: date,
      }); */

      this.message.reset();
    } catch (err) {
      await this.errorToast();
    }
  };
}
