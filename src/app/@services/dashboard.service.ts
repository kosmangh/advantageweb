import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';
import { DashboardRequest } from '../@restmodels/dashboard.request';
import { DashboardResponse } from '../@restmodels/dashboard.response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getDashboardSummary(currentUser: User): Observable<DashboardResponse> {
    const request = new DashboardRequest();
    request.searchValue = currentUser.zoneId;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DASHBOARD');
    this.logger.info('getDashboardSummary request ' + JSON.stringify(request));
    return this.http.post<DashboardResponse>(`${environment.url + PortalMenus.API_DASH}dashboard`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

}
