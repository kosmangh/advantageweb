import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    mock_url: 'http://localhost:3003/advantageservices',
    url: 'http://localhost:8080/advantageservices',
    // url: 'http://localhost:8888/advantageservices',
    timeout: 50000,
    log_url: 'http://localhost:8080/themartportal/logaction',
    server_log_level: NgxLoggerLevel.OFF,
    disable_console_logging: false
};
