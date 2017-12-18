import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActividadPage } from './add-actividad';

@NgModule({
  declarations: [
    AddActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActividadPage),
  ],
})
export class AddActividadPageModule {}
