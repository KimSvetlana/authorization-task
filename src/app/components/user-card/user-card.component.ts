import { Component, Input } from '@angular/core';

interface IUserInfo {
  userId: number,
  userName: string,
  userAvatar: string,
  userRole: number,
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent {
  iconUrl: string | undefined;
  imageErr: boolean = false;
  @Input() userInfo: IUserInfo | undefined;

  ngOnInit(): void {
    if(this.userInfo?.userAvatar !== ''){
      this.iconUrl = this.userInfo?.userAvatar;
    }
  }

  onImageError(){
    this.imageErr = true;
  }
}
