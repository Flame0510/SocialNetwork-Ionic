import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const { apiLink } = environment;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFeeds = (offset?: number, limit?: number) =>
    this.http.get(`${apiLink}/feeds?skip=${offset}&limit=${limit}`);

  publish = (message: string, imageUrl: string) =>
    this.http.post(`${apiLink}/feeds`, { message, imageUrl });

  comment = (id: number, comment: string) =>
    this.http.post(`${apiLink}/feeds/${id}/comments`, { message: comment });

  like = (id: string, like: boolean) =>
    this.http.post(`${apiLink}/feeds/${id}/likes`, { like });

  signUp = (nickname: string, password: string) =>
    this.http.post(`${apiLink}/signin`, { nickname, password });

  login = (nickname: string, password: string) =>
    this.http.post(`${apiLink}/login`, { nickname, password });

  me = () => this.http.get(`${apiLink}/me`);
}
