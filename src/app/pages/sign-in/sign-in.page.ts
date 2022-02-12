import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Storage } from '@ionic/storage-angular';

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
    private storage: Storage
  ) {}

  ngOnInit() {}

  signIn = () =>
    this.apiService
      .login(
        this.form.controls.nickname.value,
        this.form.controls.password.value
      )
      .subscribe(
        ({ accessToken }: { accessToken: string }) => (
          this.storage.set('accessToken', accessToken),
          console.log(accessToken),
          this.router.navigate(['feed'])
        )
      );
}
