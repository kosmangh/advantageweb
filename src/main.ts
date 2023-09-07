import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from './environments/environment';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { BnNgIdleService } from 'bn-ng-idle';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './app/@services/error.interceptor';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      NgHttpLoaderModule.forRoot(),
      LoggerModule.forRoot({
        serverLoggingUrl: environment.log_url, // Replace with YOUR API
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: environment.server_log_level,
        disableConsoleLogging: environment.disable_console_logging,
      }),
      // TabsModule.forRoot(),
      ModalModule.forRoot(),
      HttpCacheInterceptorModule.forRoot(),
      BrowserAnimationsModule,
      
    ),
    BnNgIdleService,
    provideRouter(APP_ROUTES, withHashLocation(), withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_CACHE_CONFIG, useValue: cashewConfig(config) }
   

  ],
}).catch((err) => console.error(err));