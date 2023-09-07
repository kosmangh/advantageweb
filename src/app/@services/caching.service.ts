import { Injectable } from '@angular/core';
import { Observable, map, of, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralRequest } from '../@restmodels/general.request';
import { RegionListResponse } from '../@restmodels/settings/region-list.response';
import { UtilsService } from './utils.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from '../@models/portalMenus';
import { withCache } from '@ngneat/cashew';
import { DropdownListResponse } from '../@restmodels/dropdown-list.response';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }


  getEstates(zoneId: string) {
    this.logger.info("getting Estates", zoneId);
    return this.http.get<DropdownListResponse>(`${environment.url + PortalMenus.API_DROPDOWNS}estates?zoneId=${zoneId}`, {
      context: withCache()
    });

  }

  getEstateBlocks(estateId: string) {
    return this.http.get<DropdownListResponse>(`${environment.url + PortalMenus.API_DROPDOWNS}blocks?estateId=${estateId}`, {
      context: withCache()
    });

  }





}
