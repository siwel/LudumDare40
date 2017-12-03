const PubSubTopics = {
	BALANCE_CHANGE: 'Balance Change', // Data - diff: number
	CO2_LEVEL_CHANGE: 'CO2 Level Change', // Data - diff: number
	POPULATION_CHANGE: 'Population Change', // Data - diff: number
	PURCHASE_REQUEST: 'PurchaseRequest', // Data - {tree: Tree}
	PURCHASE_SUCCESS: 'PurchaseSuccess', // Data - {tree: Tree}
	SELL_REQUEST: 'SellRequest', // Data - {tree: Tree}
	SELL_SUCCESS: 'SellSuccess', // Data - {tree: Tree}
	TICK: 'Tick', // No data
	TREE_ADDED: 'TreeAdded', // Data - [{xStart, xEnd, yStart, yEnd}]
	GAME_END:'gameEnd',
	TREE_IS_DEAD :'tree is dead'
	TREE_ADDED: 'TreeAdded', // Data - [{tree, xStart, xEnd, yStart, yEnd}]
	GAME_END:'gameEnd', // TODO any data?????
};

export default PubSubTopics;