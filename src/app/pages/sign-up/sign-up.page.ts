import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    nickname: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Registrazione effettuata!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Errore, riprova',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

  async emptyFieldsToast() {
    const toast = await this.toastController.create({
      message: 'Ci sono campi vuoti',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  signUp = async () => {
    if (this.form.valid) {
      try {
        await this.apiService.signUp(
          this.form.controls.nickname.value,
          this.form.controls.phone.value,
          this.form.controls.password.value
        );

        await this.successToast();

        this.router.navigate(['sign-in']);
      } catch (error) {
        await this.errorToast();
      }
    } else {
      await this.emptyFieldsToast();
    }
  };
}
