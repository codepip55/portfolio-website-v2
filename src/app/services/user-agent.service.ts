import { Injectable } from '@angular/core';
import { DeviceType } from '../models/deviceType';

@Injectable({
  providedIn: 'root'
})
export class UserAgentService {

  constructor() { }

  getDeviceType() {
    let userAgent = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent))
      return DeviceType.Mobile;

    return DeviceType.Desktop;
  }
}
