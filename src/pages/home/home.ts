import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    loginForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;
    signupPage = SignupPage;
    resetPasswordPage = ResetPasswordPage

    constructor(public navCtrl: NavController, private fb: FormBuilder, public auth: AuthProvider, public alertCtrl: AlertController) {
        this.loginForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }

    login(): void {
        if (this.loginForm.valid) {
            //console.log(this.email.value, this.password.value);
            //alert('Implement authentication');
            var credentials = ({ email: this.email.value, password: this.password.value });
            this.auth.loginWithEmail(credentials).subscribe(data => {
                console.log(data);
                this.navCtrl.push(DashboardPage);
            }, error => {
                console.log(error);
                if (error.code == 'auth/user-not-found') {
                    this.alertaNoUsuario();
                }
                if (error.code == 'auth/wrong-password') {
                    this.alertaNoCoincide();
                }
            });
        }
    }

    alertaNoCoincide() {
        let alert = this.alertCtrl.create({
            title: '¡Correo / Contraseña inválidos!',
            subTitle: 'El correo electrónico es inválido o la contraseña no coincide',
            buttons: ['OK']
        });
        alert.present();
    }

    alertaNoUsuario() {
        let alert = this.alertCtrl.create({
            title: '¡Usuario no registrado!',
            subTitle: 'El correo electrónico y la contraseña no figuran en la base de datos',
            buttons: ['OK']
        });
        alert.present();
    }
}
