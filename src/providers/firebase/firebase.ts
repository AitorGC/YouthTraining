import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class FirebaseProvider {

    constructor(public afd: AngularFireDatabase) { }

    getListaActividades() {
        return this.afd.list('/actividades/');
    }

    addItem(name) {
        this.afd.list('/actividades/').push(name);
    }

    removeItem(id) {
        this.afd.list('/actividades/').remove(id);
    }
}
