import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service';

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
    ciclos: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public servicio: UserServiceProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        this.servicio.getUsers().subscribe(
            (data) => {
                this.ciclos = data;
            },
            (error) => {
                console.error(error);
            }
        )
    }

}
