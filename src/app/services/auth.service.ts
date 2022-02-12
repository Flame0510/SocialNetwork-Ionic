import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  checkToken = () => {
    let response = false;

    console.log(this.storageService.get('accessToken'));

    this.apiService.me().subscribe(
      (result) => (response = true),
      (err) => false
    );

    return response;
  };
}
