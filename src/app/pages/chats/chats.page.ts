import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: any;
  /*  = [
    {
      id: 1,
      name: 'chat 1',
      users: [{ id: '1' }, { id: '1' }, { id: '1' }, { id: '1' }],
    },
    {
      id: 2,
      name: 'chat 2',
      users: [{ id: '1' }, { id: '1' }],
    },
    {
      id: 3,
      name: 'chat 3',
      users: [
        { id: '1' },
        { id: '1' },
        { id: '1' },
        { id: '1' },
        { id: '1' },
        { id: '1' },
        { id: '1' },
      ],
    },
  ]; */

  chatName = new FormControl();

  createChatModalVisibilty: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.getChats();
  }

  getChats = async () => {
    try {
      this.chats = await this.apiService.getChats();
    } catch (err) {
      console.log(err);
    }
  };

  toggleCreateChatModal = () =>
    (this.createChatModalVisibilty = !this.createChatModalVisibilty);

  createChat = async () => {
    try {
      await this.apiService.createChat(
        this.chatName.value,
        'https://www.goodworking.it/wp-content/uploads/2020/10/Live-Chat-per-WordPress.jpg'
      );
      this.chats.push({ id: 4, title: this.chatName.value, users: [] }),
        this.toggleCreateChatModal();
    } catch (error) {
      console.log(error);
    }
  };
}
