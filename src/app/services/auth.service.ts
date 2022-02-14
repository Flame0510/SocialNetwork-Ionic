import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  response = false;
  constructor(private apiService: ApiService, private storage: Storage) {}

  checkToken = async () => {
    try {
      await this.apiService.me();
      return true;
    } catch (error) {
      return false;
    }
  };
}
