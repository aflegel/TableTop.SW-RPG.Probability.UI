import { ICoffeeToLog, ILoggedCoffee } from "../models";

export interface ICoffeeService {
	getAllAsync(): Promise<ILoggedCoffee[]>;
	logCoffeeAsync(coffee: ICoffeeToLog): Promise<ILoggedCoffee>;
}

export class CoffeeService implements ICoffeeService {
	private fakeData: ILoggedCoffee[] = [
		{
			description: "Description 1",
			id: 1,
			// tslint:disable-next-line:max-line-length
			imageUrl: "https://spectatorhealth.imgix.net/content/uploads/2018/12/iStock-466732980.jpg?auto=compress,enhance,format&crop=faces,entropy,edges&fit=crop&w=820&h=550",
			loggedDate: new Date(),
			name: "Guatemala Huehuetenango",
			rating: 5,
			region: "La Libertad, Huehuetenango",
			storeId: 1,
			storeName: "Caliber",
			userId: 1
		},
		{
			description: "Description 2",
			id: 2,
			// tslint:disable-next-line:max-line-length
			imageUrl: "https://spectatorhealth.imgix.net/content/uploads/2018/12/iStock-466732980.jpg?auto=compress,enhance,format&crop=faces,entropy,edges&fit=crop&w=820&h=550",
			loggedDate: new Date(),
			name: "Sunshine Blend",
			rating: 4,
			region: "The World",
			storeId: 2,
			storeName: "Green Spot Cafe",
			userId: 1
		}
	];

	private idCounter: number = 3;

	public async getAllAsync(): Promise<ILoggedCoffee[]> {
		return new Promise<ILoggedCoffee[]>(resolve => {
			setTimeout(() => resolve(this.fakeData), 500);
		});
	}

	public async logCoffeeAsync(coffee: ICoffeeToLog): Promise<ILoggedCoffee> {
		const newCoffee: ILoggedCoffee = {
			description: coffee.description,
			id: this.idCounter,
			imageUrl: coffee.imageUrl,
			loggedDate: new Date(),
			name: coffee.name,
			rating: coffee.rating,
			region: coffee.region,
			storeId: coffee.storeId,
			storeName: coffee.storeName,
			userId: coffee.userId
		};
		this.fakeData = [...this.fakeData, newCoffee];
		return new Promise<ILoggedCoffee>(resolve => {
			this.idCounter += 1;
			setTimeout(() => resolve(newCoffee), 500);
		});
	}
}

export const coffeeServiceSingleton: ICoffeeService = new CoffeeService();
