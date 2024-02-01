import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUserInfo, message } from '../../utils';
import { WarningService } from 'src/app/services/warning.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: IUserInfo | undefined;
  inputForm: FormGroup;

  constructor(
    private dataService: DataService,
    private warningService: WarningService
  ) {
    this.inputForm = new FormGroup({
      warningMassage: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.dataService.userData$.subscribe((userData: IUserInfo | undefined) => {
      this.user = userData;
    });
  }

  buttonClick($event: Event) {
    let status = ($event.target as HTMLElement).id;
    let warningMessage = (message as any)[status];
    this.warningService.warningSubject.next({
      status: status,
      message: warningMessage,
    });
  }

  messageButtonClick() {
    const formValue = this.inputForm.getRawValue();
    let warningMessage = formValue.warningMassage;
    if (warningMessage === '')
      warningMessage = 'Поле для сообщений не заполнено';
    this.warningService.warningSubject.next({
      status: 'warning',
      message: warningMessage,
    });

    this.inputForm.setValue({ warningMassage: '' });
  }
}
