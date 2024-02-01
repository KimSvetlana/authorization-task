import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { IUserInfo, message } from '../../utils';
import { WarningService } from 'src/app/warning.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

let testUser =  {
  userId: 35,
  userName: "Qwe Qwe",
  userAvatar: "https://content.gamedev-academy.com/assets/user-uploads/%D0%9F%D0%B0%D1%80%D1%84%D0%B5%D0%BD%D0%BE%D0%B2%20%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9.jpg",
  userRole: 1,
};

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
