import Map from "@/components/map/map"

export default async function Home() {
    let arrondissementData = await fetch('http://localhost:3000/api/arrondissement')
    let arrondissements = await arrondissementData.json()
    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map arrondissements={arrondissements.data} />
            </div>
        </div>);
}
