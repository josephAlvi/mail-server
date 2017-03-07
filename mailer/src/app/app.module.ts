import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MailPage } from '../pages/mail/mail';
import { MailService } from '../providers/mail-service';

@NgModule({
  declarations: [
    MyApp,
    MailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, MailService]
})
export class AppModule {}
