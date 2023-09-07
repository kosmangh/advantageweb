import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../@models/user';
import { LoginResponse } from '../@restmodels/auth/login.response';
import { HeaderRequest } from '../@restmodels/header.request';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;



  constructor(
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('mwuser')!));
    this.user = this.userSubject.asObservable();
  }

  parseDate(rawDate: string): Date {
    // Remove "[UTC]" from the raw date string
    const cleanedDate = rawDate.replace('[UTC]', '');
    // Parse the cleaned date string into a Date object
    return new Date(cleanedDate);
  }


  getFirstDayDate(): Date {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    return firstDay;
  }

  getLastDayDate(): Date {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    let lastDay = new Date(y, m + 1, 0);
    return lastDay;
  }

  getLastDayOfPreviousMonth():Date {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var lastMonth = currentMonth - 1;
    var lastMonthDate = new Date(currentDate.getFullYear(), lastMonth, 0);
    return new Date(lastMonthDate);
  }

  getLastDayOfPreviousMonthName(): Date {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var lastMonth = currentMonth - 1;
    var lastMonthDate = new Date(currentDate.getFullYear(), lastMonth, 0);
    return new Date(lastMonthDate);
  }

  getCurrentMonthName() {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    return monthName;
  }

  getLastMonthName() {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const lastMonthName = lastMonth.toLocaleString('default', { month: 'long' });
    return lastMonthName;
  }

  parseDateString(dateString: string): Date | null {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  formatDate(date: Date): string {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  }

  formatDateToString(date: Date, locale: string = "en-US"): string {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  public get userSessionData(): User {
    return this.userSubject.value;
  }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    let id = stringArr.join('-');
    id = id.replace('-', '');
    id = id.replace('-', '');
    id = id.replace('-', '');
    return id;
  }

  generateRandomNumber(): string {
    const randomDigits = Math.floor(Math.random() * 10000000000);
    const formattedNumber = String(randomDigits).padStart(10, '0');
    return formattedNumber;
  }


  generateOtp() {
    var digits = '0123456789';
    let otp = '';
    for (let index = 0; index < 6; index++) {
      otp += digits[ Math.floor(Math.random() * 10) ];
    }
    for (let index = 0; index < 6; index++) {
      otp += digits[ Math.floor(Math.random() * 10) ];
    }
    return otp;
  }



  getMonthsOfYear() {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }

  getChargeYears(): any[] {
    const startYear: number = 2000;
    const currentYear: number = new Date().getFullYear();
    const yearArray: number[] = [];
    for (let year = currentYear; year >= startYear; year--) {
      yearArray.push(year);
    }
    return yearArray;
  }

 

  getIPAddress(): void {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      console.log('user id ' + res.ip);
      localStorage.setItem('ip', JSON.stringify(res.ip));
    });
  }



  getRequestHeader1(zone: string, requestType: string): HeaderRequest {
    const headerRequest = new HeaderRequest();
    headerRequest.requestId = this.generateRandomNumber();
    headerRequest.sourceCode = "WEB";
    headerRequest.zone = zone;
    headerRequest.requestType = requestType;
    headerRequest.ipAddress = this.getFakeIp();
    headerRequest.region = "EN";
    return headerRequest;
  }

  getRequestHeader(zone: string,region:string, requestType: string): HeaderRequest {
    const headerRequest = new HeaderRequest();
    headerRequest.requestId = this.generateRandomNumber();
    headerRequest.sourceCode = "WEB";
    headerRequest.zone = zone;
    headerRequest.requestType = requestType;
    headerRequest.ipAddress = this.getFakeIp();
    headerRequest.region = region;
    return headerRequest;
  }

  getUserInfo(res: LoginResponse): User {
    let user = new User();
    if (res.headerResponse.responseCode === '000') {

      user.company = res.zoneId;
      user.companyName = res.zoneName;
      user.logo = res.logo;
      user.emailAddress = res.emailAddress;
      user.fullName = res.fullName;
      user.lastLoginDate = res.lastLoginDate;
      user.userRoleName = res.userRole;
      user.username = res.username;
      user.location = res.zoneAddress;
      user.contactNo = res.zoneContact;
      user.regionId = res.regionId;
      user.regionName = res.regionName;
      user.userType = "G";
      user.zoneId = res.zoneId;
      user.zoneName = res.zoneName;
    }
    return user;
  }


  getMaskEmail(email: string): string {
    const [ name, domain ] = email.split('@');
    const { length: len } = name;
    const maskedName = name[ 0 ] + '...' + name[ len - 1 ];
    const maskedEmail = maskedName + '@' + domain;
    return maskedEmail;
  }


  getFakeIp(): string {
    const ip = `${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random()
      * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    return ip;
  }

  generatePassword(username: string): string {
    const charset = username.toLowerCase() + username.toUpperCase() + "0123456789";
    let password = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[ randomIndex ];
    }
    return password;
  }


}

