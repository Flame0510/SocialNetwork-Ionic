import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  form = new FormGroup({
    nickname: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Accesso effettuato!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Credenziali Invalide',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  async emptyFieldsToast() {
    const toast = await this.toastController.create({
      message: 'Ci sono campi vuoti',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

  signIn = async () => {
    if (this.form.valid) {
      try {
        const { accessToken } = await this.apiService.login(
          this.form.controls.nickname.value,
          this.form.controls.password.value
        );

        await this.storageService.set('accessToken', accessToken);

        await this.successToast();

        this.router.navigate(['feed']);
      } catch (error) {
        await this.errorToast();
      }
    } else {
      await this.emptyFieldsToast();
    }
  };
}
