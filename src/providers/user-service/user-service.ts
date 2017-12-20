import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  getActividades() {
      console.log("mostrar registros");
      return this.http.get("http://localhost:8080/YTmavenV3-0.1/webresources/com.aitorsantana.ytmavenv3.actividades");
  }

  postActividad(actividad) {
      console.log("insertar registro");
      console.log(actividad);
      return this.http.post(
          "http://localhost:8080/YTmavenV3-0.1/webresources/com.aitorsantana.ytmavenv3.actividades",
          actividad,
          {
              headers: { "Content-Type": "application/json" }
          }
      );
  }

  deleteActividad(actividadId) {
      console.log("borrar registro nº" + actividadId);
      return this.http.delete(
          "http://localhost:8080/YTmavenV3-0.1/webresources/com.aitorsantana.ytmavenv3.actividades/" + actividadId
      ).subscribe(
          resp => console.log('borrado'),
          error => console.log('no se pudo borrar')
          );
  }
}
