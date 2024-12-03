import Map from "@/components/map/map"

export default async function Home() {
    const arrondissementData = await fetch('http://localhost:3000/api/arrondissement')
    const arrondissements = await arrondissementData.json()
    const quartierData = await fetch('http://localhost:3000/api/quartier')
    const quartiers = await quartierData.json()
    const voieData = await fetch('http://localhost:3000/api/voie')
    const voies = await voieData.json()
    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map arrondissements={arrondissements.data} voies={voies.data} quartiers={quartiers.data}/>
            </div>
        </div>);
}
