import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { AnadirActividadPage } from "../anadir-actividad/anadir-actividad";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
    actividades: any;
    numero: any;

    constructor(public navCtrl: NavController, public auth: AuthProvider, public servicio: UserServiceProvider) {

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

    deleteActividad(): void {
        this.servicio.deleteActividad(this.numero);
    }

    addActividad(): void {
        this.navCtrl.push(AnadirActividadPage);
    }

    logout(): void {
        this.auth.logout();
        this.navCtrl.push(HomePage);
    }

}
