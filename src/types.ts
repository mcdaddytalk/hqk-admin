export type Source = "SPIGOT" | "BUKKIT" | "KAJE" | "POLYMART" | "MODRINTH" | "GITHUB"

export type SourceIcon = JSX.Element

export type SourceKey = keyof Source

export type Plugin = {
    id: number
    name: string
    title: string
    c_version: string
    l_version: string
    location: string
    source: string
    resource_id: string
    premium: boolean
    retired: boolean
    active: boolean
}