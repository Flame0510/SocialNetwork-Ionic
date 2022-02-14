import { IChat } from './../../../models/chat';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatId: string;

  message = new FormControl();

  chat: IChat | Partial<IChat> | undefined;

  userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.getUserData();
    this.getChat();
    //this.joinChat();
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

  send = () => {
    try {
      const date = new Date()
        .toLocaleString()
        .split('/')
        .join('-')
        .split(',')
        .join(' - ');

      this.chat.messages.push({
        message: this.message.value,
        creator: {
          nickname: this.userData.nickname,
          id: this.userData.id,
        },
        id: '1',
        date: date,
      });

      this.message.reset();
    } catch (err) {
      console.log(err);
    }
  };
}
