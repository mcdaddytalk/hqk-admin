import { createElement } from "react";
import { Source, SourceIcon } from "./types";

export const SOURCES: Record<Source, SourceIcon> = {
    SPIGOT: createElement("img", { src: "/spigot.png", alt: "Spigot", className: "h-6 w-6" }),
    BUKKIT: createElement("img", { src: "/getbukkit.png", alt: "Bukkit", className: "h-6 w-6" }),
    GITHUB: createElement("img", { src: "/github.svg", alt: "Github", className: "h-6 w-6" }),
    POLYMART: createElement("img", { src: "/spigot.png", alt: "Polymart", className: "h-6 w-6" }),
    MODRINTH: createElement("img", { src: "/modrinth.svg", alt: "Modrinth", className: "h-6 w-6" }),
    KAJE: createElement("img", { src: "/spigot.png", alt: "KAJE", className: "h-6 w-6" }),
}

export const SOURCE_API: Record<Source, string> = {
    SPIGOT: process.env.SPIGET_API ?? "https://api.spigotmc.org/",
    BUKKIT: "https://api.bstats.org/",
    GITHUB: "https://api.github.com/repos/",
    POLYMART: "https://polymart.dev/",
    MODRINTH: "https://modrinth.com/",
    KAJE: "https://kaje.dev/",
}