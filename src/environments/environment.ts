import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    mock_url: 'http://localhost:3003/advantageservices',
    // url: 'http://localhost:3003/advantageservices',
    url: 'http://localhost:8888/advantageservices',
    // url: 'http://localhost:8080/advantageservices',
    timeout: 50000,
    reset_time:1500,
    log_url: 'http://localhost:8080/themartportal/logaction',
    server_log_level: NgxLoggerLevel.OFF,
    disable_console_logging: false,
    api_key: '123456',
    token: '2345566'
};
