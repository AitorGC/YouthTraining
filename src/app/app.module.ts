import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { DashboardPage } from "../pages/dashboard/dashboard";

import { HttpClientModule } from '@angular/common/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

export const firebaseConfig = {
    apiKey: "AIzaSyB-Gmu3qu-dJTnHC2yPozJyGFpwrpueSt0",
    authDomain: "apirestfull-damtarde.firebaseapp.com",
    databaseURL: "https://apirestfull-damtarde.firebaseio.com",
    projectId: "apirestfull-damtarde",
    storageBucket: "apirestfull-damtarde.appspot.com",
    messagingSenderId: "866583495529"
};

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      SignupPage,
      ResetPasswordPage,
      DashboardPage
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      SignupPage,
      ResetPasswordPage,
      DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    AuthProvider,
    AngularFireAuth,
    FirebaseProvider
  ]
})
export class AppModule {}
