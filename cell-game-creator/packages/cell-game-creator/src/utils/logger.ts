export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

export interface LoggerOptions {
  color: string;
  backgroundColor: string;
  logLevel: LogLevel;
}

export function createLogger(
  prefix: string,
  options: Partial<LoggerOptions> = {}
): Logger {
  return new Logger(prefix, options);
}

export class Logger {
  static minLogLevel: LogLevel = LogLevel.DEBUG;

  protected readonly prefixStyle: string;
  protected readonly prefix: string;
  protected readonly options: LoggerOptions;

  constructor(prefix: string, options: Partial<LoggerOptions>) {
    this.prefix = prefix.trim();
    this.options = {
      color: "black",
      backgroundColor: "white",
      logLevel: LogLevel.DEBUG,

      ...options,
    };

    this.prefixStyle = `
      background: ${options.backgroundColor};
      color: ${options.color};
      font-weight: bold;
      border-radius: 5px;
      padding: 2px 5px;
    `;
  }

  protected _run<K extends "log" | "info" | "warn" | "error">(
    logLevel: LogLevel,
    method: K,
    ...arg: any[]
  ): void {
    const isValidLogLevel =
      logLevel >= Logger.minLogLevel && logLevel >= this.options.logLevel;
      
    if (!isValidLogLevel) {
      return;
    }

    console[method](`%c[${this.prefix}]%c`, this.prefixStyle, "", ...arg);
  }

  debug(...arg: any[]): void {
    this._run(LogLevel.DEBUG, "log", ...arg);
  }

  log(...arg: any[]): void {
    this._run(LogLevel.DEBUG, "log", ...arg);
  }

  info(...arg: any[]): void {
    this._run(LogLevel.INFO, "info", ...arg);
  }

  warn(...arg: any[]): void {
    this._run(LogLevel.WARN, "warn", ...arg);
  }

  error(...arg: any[]): void {
    this._run(LogLevel.ERROR, "error", ...arg);
  }

  createChild(prefix: string, options: Partial<LoggerOptions> = {}): Logger {
    return new Logger(`${this.prefix}/${prefix}`, {
      ...this.options,
      ...options,
    });
  }
}
