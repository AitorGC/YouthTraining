import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBuufwaJCZXejeuXOJPp7sR7zwvht0X1zc",
    authDomain: "prototipolnd.firebaseapp.com",
    databaseURL: "https://prototipolnd.firebaseio.com",
    storageBucket: "prototipolnd.appspot.com"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      DashboardPage,
      LoginPage,
      RegisterPage,
      ResetpwdPage
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      DashboardPage,
      LoginPage,
      RegisterPage,
      ResetpwdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    AuthService
  ]
})
export class AppModule {}
