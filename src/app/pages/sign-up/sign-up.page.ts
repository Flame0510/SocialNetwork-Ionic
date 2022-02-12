import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    nickname: new FormControl(),
    password: new FormControl(),
  });

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {}

  signUp = () =>
    this.apiService
      .signUp(
        this.form.controls.nickname.value,
        this.form.controls.password.value
      )
      .subscribe((result) => this.router.navigate(['sign-in']));
}
