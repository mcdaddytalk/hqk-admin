import TableWrapper from '@/components/table/TableWrapper'
import prisma from '@/lib/db'
import React from 'react'

const getPlugins = async () => {
    return await prisma.plugin.findMany()
}
export default async function PluginsView() {
    const plugins = await getPlugins()

    return (
        <section className="container space-y-5">
            <h2 className="font-bold">Plugins</h2>
            <div>
                <TableWrapper plugins={plugins} />
            </div>
        </section>
    )
}
