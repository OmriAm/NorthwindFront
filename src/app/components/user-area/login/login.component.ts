import { Component } from '@angular/core';
import { CredentialsModel } from '../../../models/credentials.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    private credentials = new CredentialsModel();
    public credentialsForm: FormGroup;


    public constructor(
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        private notifyService: NotifyService
    ) { }

    ngOnInit(): void {
        this.credentialsForm = this.formBuilder.group({
            emailControl: new FormControl(""),
            passwordControl: new FormControl(""),

        })
    }

    public async send() {
        try {
            this.credentials.email = this.credentialsForm.get("emailControl").value;
            this.credentials.password = this.credentialsForm.get("passwordControl").value;
            await this.userService.login(this.credentials);
            this.notifyService.success(`welcome back!`);
            this.router.navigateByUrl("/home");

        } catch (err: any) {
            this.notifyService.error(err);
        }
    }

}
