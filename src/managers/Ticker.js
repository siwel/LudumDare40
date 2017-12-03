export default class Ticker {
	constructor()
	{
		// TODO
	}

	tick(data) {
		return Object.assign(data, {
			balance: data.balance + data.moneyPerTick,
			CO2Level: data.CO2Level + (data.CO2IncreasePerTick - data.CO2DecreasePerTick),
			trees: data.trees.map(tree => tree.growTree()),
		});
	}
}