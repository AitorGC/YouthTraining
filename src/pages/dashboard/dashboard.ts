import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
    actividades: any;
    listaActividades: FirebaseListObservable<any>;
    newItem = '';

    constructor(public navCtrl: NavController, public auth: AuthProvider, public servicio: UserServiceProvider, public firebaseProvider: FirebaseProvider) {
        this.listaActividades = this.firebaseProvider.getListaActividades();
    }

    addItem() {
        this.firebaseProvider.addItem(this.newItem);
    }

    removeItem(id) {
        this.firebaseProvider.removeItem(id);
    }

    /*ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        this.servicio.getActividades().subscribe(
            (data) => {
                this.actividades = data;
            },
            (error) => {
                console.error(error);
            }
        )
    }*/

    logout(): void {
        this.auth.logout();
        this.navCtrl.push(HomePage);
    }

}
