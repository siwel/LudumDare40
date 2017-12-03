const PubSubTopics = {
	BALANCE_CHANGE: 'Balance Change', // Data - diff: number
	CO2_LEVEL_CHANGE: 'CO2 Level Change', // Data - diff: number
	POPULATION_CHANGE: 'Population Change', // Data - diff: number
	PURCHASE_REQUEST: 'PurchaseRequest', // Data - {tree: Tree}
	PURCHASE_SUCCESS: 'PurchaseSuccess', // Data - {tree: Tree}
	TICK: 'Tick', // No data
	GAME_END:'gameEnd'
};

export default PubSubTopics;