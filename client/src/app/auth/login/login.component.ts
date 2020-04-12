import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }


  onSubmit(){
    if (this.form.invalid) {
      let msg: string;
      for (let key in this.form.value) {
        if (this.form.get(key).invalid) {
          let error: string;
          if (this.form.get(key).hasError('required')) {
            error = 'required !';
          } else {
            error = 'invalid !';
          }
          msg = key + ' ' + error;
          break;
        }
      }
      return;
    } else {
      const user = {
        username : this.form.value.username,
        password : this.form.value.password
      };
      this.authService.login(user);
    }
  }

}
