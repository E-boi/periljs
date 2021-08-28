var ColorCodes = {
	Reset: '\x1b[0m',
	Bright: '\x1b[1m',
	Dim: '\x1b[2m',
	Underscore: '\x1b[4m',
	Blink: '\x1b[5m',
	Reverse: '\x1b[7m',
	Hidden: '\x1b[8m',

	FgBlack: '\x1b[30m',
	FgRed: '\x1b[31m',
	FgGreen: '\x1b[32m',
	FgYellow: '\x1b[33m',
	FgBlue: '\x1b[34m',
	FgMagenta: '\x1b[35m',
	FgCyan: '\x1b[36m',
	FgWhite: '\x1b[37m',

	BgBlack: '\x1b[40m',
	BgRed: '\x1b[41m',
	BgGreen: '\x1b[42m',
	BgYellow: '\x1b[43m',
	BgBlue: '\x1b[44m',
	BgMagenta: '\x1b[45m',
	BgCyan: '\x1b[46m',
	BgWhite: '\x1b[47m',
};
export enum LogLevel {
	INFO = 0,
	LOG,
	WARN,
	ERROR,
	RECOVERABLE,
	UNRECOVERABLE,
}

export class Logger {
	minimumLogLevel: LogLevel;
	prefix: string;
	constructor(minimumLogLevel: LogLevel, prefix: string) {
		this.minimumLogLevel = minimumLogLevel;
		this.prefix = prefix;
	}
	log(level: LogLevel, message: string, ...args: any[]): void {
		if (level >= this.minimumLogLevel) {
			let color = getColorFromLogLevel(level);
			let messageWithPrefix = this.prefix + ` [ ${getLogLevelString(level)} ] ` + message;
			console.log(color + messageWithPrefix, ...args, ColorCodes.Reset);
		}
	}
	setMinimumLogLevel(minimumLogLevel: LogLevel): void {
		this.minimumLogLevel = minimumLogLevel;
	}
	setPrefix(prefix: string): void {
		this.prefix = prefix;
	}
}
function getColorFromLogLevel(level: LogLevel) {
	switch (level) {
		case LogLevel.INFO:
			return ColorCodes.FgWhite;
		case LogLevel.LOG:
			return ColorCodes.FgWhite;
		case LogLevel.WARN:
			return ColorCodes.FgYellow;
		case LogLevel.ERROR:
			return ColorCodes.FgRed;
		case LogLevel.RECOVERABLE:
			return ColorCodes.FgYellow;
		case LogLevel.UNRECOVERABLE:
			return ColorCodes.FgRed;
		default:
			return ColorCodes.FgWhite;
	}
}
function getLogLevelString(level: LogLevel): string {
	switch (level) {
		case LogLevel.INFO:
			return 'INFO';
		case LogLevel.LOG:
			return 'LOG';
		case LogLevel.WARN:
			return 'WARN';
		case LogLevel.ERROR:
			return 'ERROR';
		case LogLevel.RECOVERABLE:
			return 'RECOVERABLE';
		case LogLevel.UNRECOVERABLE:
			return 'UNRECOVERABLE';
		default:
			return 'UNKNOWN';
	}
}
