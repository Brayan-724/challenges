export enum LogLevel {
  None,
  Error,
  Warn,
  Info,
  Debug,
}

export class Logger {
  constructor(
    public readonly logLevel: LogLevel,
    public readonly prefix: string = ""
  ) {}

  register(prefix: string, logLevel?: LogLevel): Logger {
    return new Logger(logLevel ?? this.logLevel, this.prefix + prefix);
  }

  error(...args: any[]): void {
    if (this.logLevel <= LogLevel.Error) return;
    console.error(this.prefix, ...args);
  }

  warn(...args: any[]): void {
    if (this.logLevel <= LogLevel.Warn) return;
    console.warn(this.prefix, ...args);
  }

  log(...args: any[]): void {
    if (this.logLevel <= LogLevel.Info) return;
    console.info(this.prefix, ...args);
  }

  info = this.log;

  debug(...args: any[]): void {
    if (this.logLevel <= LogLevel.Debug) return;
    console.debug(this.prefix, ...args);
  }
}
