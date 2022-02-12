import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  get = async (key: string) => await this.storage.get(key);

  remove = async (key: string) => await this.storage.remove(key);
}
