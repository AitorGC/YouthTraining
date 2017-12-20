import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    signupForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider, public alertCtrl: AlertController) {
        this.signupForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.email = this.signupForm.controls['email'];
        this.password = this.signupForm.controls['password'];
    }

    submit(): void {
        if (this.signupForm.valid) {
            var credentials = ({ email: this.email.value, password: this.password.value });
            this.auth.registerUser(credentials).subscribe(registerData => {
                console.log(registerData);
                this.usuarioRegistrado();
                this.navCtrl.setRoot(DashboardPage);
            }, registerError => {
                console.log(registerError);
                if (registerError.code === 'auth/weak-password') {
                    this.contrasenaDebil();
                } else if (registerError.code === 'auth/email-already-in-use') {
                    this.usuarioNoRegistrado();
                }
                this.error = registerError;
            });
        }
    }

    usuarioRegistrado() {
        let alert = this.alertCtrl.create({
            title: '¡Registrado!',
            subTitle: 'Usuario registrado y logueado correctamente',
            buttons: ['OK']
        });
        alert.present();
    }

    contrasenaDebil() {
        let alert = this.alertCtrl.create({
            title: '¡Mejore su contraseña!',
            subTitle: 'La contraseña es demasiado débil. Inserte una contraseña de entre 6 y 20 caracteres.',
            buttons: ['OK']
        });
        alert.present();
    }

    usuarioNoRegistrado() {
        let alert = this.alertCtrl.create({
            title: '¡Usuario no registrado!',
            subTitle: 'El usuario ya figura en la base de datos',
            buttons: ['OK']
        });
        alert.present();
    }
}
