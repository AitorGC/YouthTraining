import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
    resetPasswordForm: FormGroup;
    email: AbstractControl;

    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider, public alertCtrl: AlertController) {
        this.resetPasswordForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])]
        });

        this.email = this.resetPasswordForm.controls['email'];
    }


        submit(): void {
            if (this.resetPasswordForm.valid) {
                this.auth.resetPassword(this.email.value).subscribe(registerData => {
                    this.contrasenaEnviada();
                    this.navCtrl.setRoot(HomePage);
                }, registerError => {
                    console.log(registerError);
                    if (registerError.code === 'auth/user-not-found') {
                        this.alertaNoUsuario();
                    }
                });
            }
        }

    contrasenaEnviada() {
        let alert = this.alertCtrl.create({
            title: '¡Contraseña enviada!',
            subTitle: 'Revise su correo electrónico para restablecer su contraseña',
            buttons: ['OK']
        });
        alert.present();
    }

    alertaNoUsuario() {
        let alert = this.alertCtrl.create({
            title: 'Usuario no registrado!',
            subTitle: 'El correo electrónico y la contraseña no figuran en la base de datos',
            buttons: ['OK']
        });
        alert.present();
    }
}
