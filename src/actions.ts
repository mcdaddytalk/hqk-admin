"use server"

import prisma from "@/lib/db"
import { Plugin } from "@/types"
import { SOURCES, SOURCE_API } from "./constants"
import { revalidatePath } from "next/cache"

export const getPlugins = async () => {
    return await prisma.plugin.findMany()
}

export const getPlugin = async (pluginId: number) => {
    return await prisma.plugin.findUnique({
        where: {
            id: pluginId
        }
    })
}

export const createPlugin = async (plugin: Plugin) => {
    await prisma.plugin.create({
        data: plugin
    }).catch((error) => {
        console.log(error)
        throw new Error(error)
    })
}

export const removePlugin = async (pluginId: number) => {
    const plugin = await getPlugin(pluginId).catch((error) => {
        console.log(error)
        throw new Error(error)
    })

    if (!plugin) {
        throw new Error('Plugin not found')
    }

    await prisma.plugin.delete({
        where: {
            id: pluginId
        }
    }).catch((error) => {
        console.log(error)
        throw new Error(error)
    })
}

export const updatePlugin = async (pluginId: number) => {
    const plugin = await getPlugin(pluginId).catch((error) => {
        console.log(error)
        throw new Error(error)
    })

    if (!plugin) {
        throw new Error('Plugin not found')
    }

    await prisma.plugin.update({
            where: {
                id: pluginId
            },
            data: {
                title: plugin?.title,
                location: plugin?.location
            }
        }).catch((error) => {
            console.log(error)
            throw new Error(error)
        })
}

export const searchPlugins = async (query: string) => {
    return await prisma.plugin.findMany({
        where: {
            title: {
                contains: query
            }
        }
    })
}

export const updateVersion = async (pluginId: number, source: string, resource:string,  version: string) => {
    const BASE_URL = SOURCE_API[source as keyof typeof SOURCES];
    const result = await fetch(`${BASE_URL}/resources/${resource}/versions/latest`);
    if (!result.ok) {
        throw new Error('Failed to update version');
    }

    const data = await result.json();
    console.log(data)
    if (data.name !== version) {
        await prisma.plugin.update({
            where: {
                id: pluginId
            },
            data: {
                l_version: data.name
            }
        })    
    }
    
    revalidatePath('/plugins')
}