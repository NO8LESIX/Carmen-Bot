export enum CreatureSize {
    Fine,
    Diminutive,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
    Colossal
}
export enum DamageType {
    Acid,
    Fire,
    Lightning,
}
export interface DNDCampaign {
    CampaignId: number
    CampaignName: string
    Players: Player
    Scenarios: Scenario[]
}
export interface Scenario {
    Description: string
    Encounters: Encounter[]
}
export interface Encounter {
    Enemy?: AI[]
    Friendly?: AI[]
}
export interface Player {
    Armor?: Armor
    CreatureSize: CreatureSize
    Description: string
    HP: number
    Level: number
    Name: string
    Shield?: boolean
    Spells?: Spell
    Stats: Stats
    Weapon?: Weapon
}
export interface AI {
    Armor?: Armor
    CreatureSize: CreatureSize
    Description: string
    HP: number
    Name: string
    SavingThrows?: SavingThrows
    Shield?: boolean
    Skills?: Skills
    Spells?: Spell
    Stats: Stats
    Weapon?: Weapon
}
export interface Stats {
    AC: number
    CHA: number
    CON: number
    DEX: number
    INT: number
    STR: number
    WIS: number
}
export interface Skills {

}
export interface SavingThrows {

}
export enum WeaponClass {
    Martial,
    MartialRanged,
    SimpleMelee,
    SimpleRanged,
}
export interface Weapon {
    Name: string
    WeaponClass: WeaponClass
    DamageMax: number
    DamageMin: number
    Range: number
    RequiresAmmo: boolean
    AmmoCount?: number
}
export enum ArmorClass {
    Light,
    Medium,
    Heavy
}
export enum ArmorMaterial {
    Breastplate,
    ChainMail,
    ChainShirt,
    Halfplate,
    Hide,
    Leather,
    Padded,
    Plate,
    RingMail,
    ScaleMail,
    Splint,
    StuddedLeather,
}
export interface Armor {
    ArmorClass: ArmorClass
    ArmorMaterial: ArmorMaterial
    Name: string
    Stealthy?: boolean
}
export interface Effect {
    DamageMax: number
    DamageMin: number
    Name: string
    RemainingDuration: number
}
export enum School {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Illusion,
    Necromancy,
    Transmutation
}

export interface Spell {
    DamageMax: number
    DamageMin: number
    Descritpion: string
    CastTime: number
    Name: string
    Range: number
    School: School
    StatusEffect?: Effect
    Type: DamageType
    Components?: string[]
}