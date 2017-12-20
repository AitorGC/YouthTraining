import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { HomePage } from "../home/home";
import { DashboardPage } from "../dashboard/dashboard";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

/**
 * Generated class for the AnadirActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anadir-actividad',
  templateUrl: 'anadir-actividad.html',
})
export class AnadirActividadPage {

    formActividad: FormGroup;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public fb: FormBuilder,
        public auth: AuthProvider, public servicio: UserServiceProvider) {

        this.formActividad = this.fb.group({
            nombre: ['', [Validators.required]],
            localizacion: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            fecha_ini: ['', [Validators.required]],
            fecha_fin: ['', [Validators.required]],
            max_inscritos: ['', [Validators.required]],
        });
    }

    saveActividad() {
      var actividad = {
          nombre: this.formActividad.get('nombre').value,
          localizacion: this.formActividad.get('localizacion').value,
          descripcion: this.formActividad.get('descripcion').value,
          fechaIni: this.formActividad.get('fecha_ini').value,
          fechaFin: this.formActividad.get('fecha_fin').value,
          maxInscritos: this.formActividad.get('max_inscritos').value,
      }

      this.servicio.postActividad(actividad).subscribe(
          (data) => {
              console.log(data);
              this.alertaAnadida();
              this.navCtrl.push(DashboardPage);
          },
          (error) => {
              console.log(error);
              this.falloInesperado();
          });
    }

  alertaAnadida() {
      let alert = this.alertCtrl.create({
          title: '¡Añadida!',
          subTitle: 'La actividad fue añadida correctamente',
          buttons: ['OK']
      });
      alert.present();
  }

  falloInesperado() {
      let alert = this.alertCtrl.create({
          title: '¡Oooops!',
          subTitle: 'Algo falló al añadir la actividad. Inténtalo de nuevo más tarde.',
          buttons: ['OK']
      });
      alert.present();
  }

  volver(): void {
      this.navCtrl.push(DashboardPage);
  }

  logout(): void {
      this.auth.logout();
      this.navCtrl.push(HomePage);
  }

}
