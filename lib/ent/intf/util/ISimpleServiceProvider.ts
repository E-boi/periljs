export interface ISimpleServiceProvider {
	addSingleton<T>(service: T, id: string): ISimpleServiceProvider;
	get<T>(id: string): T;
	addTransient<T>(service: T, id: string): ISimpleServiceProvider;
}
