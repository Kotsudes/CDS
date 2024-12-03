import Map from "@/components/map/map"

export default async function Home() {
    let arrondissementData = await fetch('http://localhost:3000/api/arrondissement')
    let arrondissements = await arrondissementData.json()
    let voieData = await fetch('http://localhost:3000/api/voie')
    let voies = await voieData.json()
    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map arrondissements={arrondissements.data} voies={voies.data} />
            </div>
        </div>);
}
