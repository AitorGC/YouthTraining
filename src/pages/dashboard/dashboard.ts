import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
    actividades: any;

    constructor(public navCtrl: NavController, public servicio: UserServiceProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        this.servicio.getActividades().subscribe(
            (data) => {
                this.actividades = data;
            },
            (error) => {
                console.error(error);
            }
        )
    }

}
