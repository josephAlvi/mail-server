import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { MailService } from '../../providers/mail-service';


@Component({
  selector: 'page-mail',
  templateUrl: 'mail.html'
})
export class MailPage {
  private _mailForm: FormGroup;
  private _loading: Loading;
  private _alert: Alert;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private loadingController: LoadingController,
    private alertController: AlertController, private mailService: MailService) {
    this.mailForm = formBuilder.group({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      cc: new FormControl(''),
      bcc: new FormControl(''),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  private get mailForm(): FormGroup { return this._mailForm; };
  private set mailForm(value: FormGroup) { this._mailForm = value; };

  private get loading(): Loading { return this._loading; };
  private set loading(value: Loading) { this._loading = value; };

  public get alert(): Alert { return this._alert; };
  public set alert(value: Alert) { this._alert = value; };

  private showLoading() {
    this.loading = this.loadingController.create({
      content: 'Working...'
    })
    this.loading.present();
  };

  private hideLoading() {
    this.loading.dismiss();
  };

  public showError(errMessage?: string, errDetail?: string) {
    this.alert = this.alertController.create();
    this.alert.setTitle(errMessage || 'Internal Error!');
    this.alert.setMessage(errDetail || 'Please Report IT Services');
    this.alert.addButton('OK');
    this.alert.present();
  };

  private sendMail(event) {
    event.preventDefault();
    if (this.mailForm.invalid) {
      this.showError('Validation Error', 'Please provide value for all mandatory fields');
      return;
    }
    this.showLoading();
    this.mailService.sendMail(this.mailForm.value).subscribe((data: any) => {
      this.hideLoading();
      this.showError(data.message, data.detail);
    }, (err) => {
      this.hideLoading();
      console.error(err);
      this.showError(err.message, err.detail);
    });


  };

}
