import { AxiosRequestConfig } from 'axios';
//services
import StorageService from './StorageService';
import ApiService from './ApiService';
import NavigationService from './NavigationService';
import EventsService, { EventsPoints } from './EventsService';
//models
import { UserModel } from '../models/User.model';

let lock = false;

let UserData: UserModel = {
  token: '',
  refreshToken: '',
  roles: [],
};

let getUserDataFromStorageOnInit = async (): Promise<UserModel> => {
  return new Promise(async resolve => {
    const token = await StorageService.get(StorageService.Points.TOKEN);
    const refreshToken = await StorageService.get(
      StorageService.Points.REFRESHTOKEN
    );
    const roles = await StorageService.get(StorageService.Points.ROLES);

    if (token) {
      UserData.token = token;
      UserData.refreshToken = refreshToken;
      UserData.roles = JSON.parse(roles);
    }

    resolve(UserData);
  });
};

let setUserData = (newData: UserModel): void => {
  UserData = { ...UserData, ...newData };
};

let getUserData = (): UserModel => {
  return UserData;
};

let getUserInfoFromApi = async (): Promise<void> => {
  //TO DO
  // let body: AxiosRequestConfig = {
  //   url: ApiService.Points.USER_INFO,
  //   method: 'post',
  //   data: {
  //     push_device_token: UserData.token,
  //     market: id || UserData.exchangeId,
  //   }
  // };
  // try {
  //   let {data}: any = await ApiService.request(body);
  //   console.log('getUserData', data)
  //   if (data.status === 'success') {
  //     data = data.data;
  //     setUserData({
  //       userName: data.user.firstname + ' ' + data.user.lastname,
  //       userSubscription: data.user.subscription.valid_until,
  //       botStatusButtonStatus: data.button.status,
  //       botStatusButtonVisible: data.button.visible
  //     });
  //     EventsService.emitEvent(EventsPoints.USERDATA_CHANGED);
  //   }
  // }
  // catch(error) {
  //   console.log(error);
  // }
};

let logout = async (): Promise<void> => {
  if (!lock) {
    lock = true;
    StorageService.remove(StorageService.Points.TOKEN);
    StorageService.remove(StorageService.Points.REFRESHTOKEN);
    StorageService.remove(StorageService.Points.ROLES);
    setUserData({ token: '', refreshToken: '' });
    setTimeout(() => {
      NavigationService.resetMainStackThenNavigate('LoginPage');
      lock = false;
    }, 500);
  }
};

let login = async (
  token: string,
  refreshToken: string,
  roles: { name: string }[]
): Promise<void> => {
  if (!lock) {
    lock = true;
    StorageService.set(StorageService.Points.TOKEN, token);
    StorageService.set(StorageService.Points.REFRESHTOKEN, refreshToken);
    StorageService.set(StorageService.Points.ROLES, JSON.stringify(roles));
    setUserData({ token, refreshToken, roles });
    setTimeout(() => {
      NavigationService.resetMainStackThenNavigate('MainContainer');
      lock = false;
    }, 500);
  }
};

export default {
  getUserData,
  setUserData,
  getUserDataFromStorageOnInit,
  getUserInfoFromApi,
  logout,
  login,
};
