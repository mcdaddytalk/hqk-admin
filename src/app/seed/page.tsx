import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import { type Plugin } from "@/types"

const data: Plugin[] = [
    {
        id: 0,
        name: "autorank",
        title: "Autorank",
        c_version: "5.2.1",
        l_version: "5.2.1",
        location: "https://www.spigotmc.org/resources/autorank.3239/",
        source: "SPIGOT",
        resource_id: "3239",
        premium: false,
        retired: false,
        active: true
    },
    {
        id: 1,
        name: "bottledexp",
        title: "Bottled XP",
        c_version: "3.2.2.2",
        l_version: "3.2.2.2",
        location: "https://www.spigotmc.org/resources/bottledexp.2815/",
        source: "SPIGOT",
        resource_id: "2815",
        premium: false,
        retired: false,
        active: true
    },
    {
        id: 2,
        name: "chestsort",
        title: "Chest Sort",
        c_version: "14.0.0",
        l_version: "14.0.0",
        location: "https://www.spigotmc.org/resources/chestsort-api.59773/",
        source: "SPIGOT",
        resource_id: "59773",
        premium: false,
        retired: false,
        active: true
    },
    {
        id: 3,
        name: "citizens",
        title: "Citizens",
        c_version: "",
        l_version: "2.0.33b3",
        location: "https://www.spigotmc.org/resources/citizens.13811",
        source: "SPIGOT",
        resource_id: "13811",
        premium: false,
        retired: false,
        active: false
    },
    {
        id: 4,
        name: "cmilib",
        title: "CMILib",
        c_version: "1.4.5.0",
        l_version: "1.4.5.0",
        location: "https://www.spigotmc.org/resources/cmilib.87610/",
        source: "SPIGOT",
        resource_id: "87610",
        premium: false,
        retired: false,
        active: true
    },
    {
        id: 30,
        name: "luckperms",
        title: "LuckPerms",
        c_version: "5.4.102",
        l_version: "5.4.117",
        location: "https://www.spigotmc.org/resources/luckperms.28140/",
        source: "SPIGOT",
        resource_id: "28140",
        premium: false,
        retired: false,
        active: true
    },
    {
        id: 31,
        name: "mcdeuls",
        title: "MC Duels",
        c_version: "2.4.1",
        l_version: "2.4.1",
        location: "https://www.spigotmc.org/resources/mcduels-2-practice-pvp-pvp-bots-duels-1v1-2v2-3v3-build-kit-editor-more-1-8-1-19.42131/",
        source: "SPIGOT",
        resource_id: "42131",
        premium: true,
        retired: false,
        active: false
    }
]

export default function SeedDatabase() {
    async function postData() {
        "use server"

        await prisma.plugin.createMany({ 
            skipDuplicates: true,
            data
        })
    }

    return (
        <div className="m-5">
            <form action={postData}>
                <Button type="submit">Seed Database</Button>
            </form>
        </div>
    )
}