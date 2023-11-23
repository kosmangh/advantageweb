import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    mock_url: 'http://localhost:3003/advantageservices',
    url: 'http://testsite.bolaapps.com/advantageservices',
    timeout: 50000,
    //log_url: 'http://localhost:8080/advantageweb/logaction',
    log_url: 'http://testsite.bolaapps.com/themartportal/logaction',
    server_log_level: NgxLoggerLevel.OFF,
    disable_console_logging: false
};




