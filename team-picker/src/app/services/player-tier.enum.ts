export enum PlayerTierEnum {
    'S', 'A', 'B', 'C', 'D', 'E', 'F'
}

export const PLAYER_TIERS_STR = Object.keys(PlayerTierEnum).filter(key => !isNaN(Number(PlayerTierEnum[key as keyof typeof PlayerTierEnum])));
