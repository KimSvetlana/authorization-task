export interface IUserInfo {
  userId: number,
  userName: string,
  userAvatar: string,
  userRole: number,
}

export interface IResponse {
  hasError: boolean;
  errors: string[];
  total: number;
  data: {
    userInfo: IUserInfo;
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
}

export interface IErrorItem {
  status: string;
  message: string;
}

export enum Status {
  error = "error",
  warning = "warning",
  ok = "ok"
}

export let message: object = {
  error: "Сообщение об ошибке",
  warning: "Пердупредительное сообщение",
  ok: "Сообщение об успехе"
};
