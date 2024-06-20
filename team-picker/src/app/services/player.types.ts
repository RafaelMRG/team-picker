export enum PLAYER_TIER {
	'S', 'A', 'B', 'C', 'D', 'E', 'F'
}

export const PLAYER_TIERS_STR = Object.keys(PLAYER_TIER).filter(key => !isNaN(Number(
	PLAYER_TIER[key as keyof typeof PLAYER_TIER])));

export interface Player {
	tier: PLAYER_TIER;
	nick: string;
}

export interface Leaders {
	leaderA: Player | null;
	leaderB: Player | null;
}