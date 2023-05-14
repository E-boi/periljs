enum Colors {
  black = "\u001b[30m",
  red = "\u001b[31m",
  green = "\u001b[32m",
  blue = "\u001b[34m",
  reset = "\u001b[0m",
}

export default class Logger {
  static debug = false;
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  log(...message: unknown[]) {
    if (!Logger.debug) return;
    console.log(`${Colors.blue}[${this.prefix}]${Colors.reset}`, ...message);
  }

  debug(...message: unknown[]) {
    if (!Logger.debug) return;
    console.debug(`${Colors.green}[${this.prefix}]${Colors.reset}`, ...message);
  }

  error(...message: unknown[]) {
    if (!Logger.debug) return;
    console.error(`${Colors.red}[${this.prefix}]${Colors.reset}`, ...message);
  }
}
