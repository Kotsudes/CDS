import Map from "@/components/map/map"

export default async function Home() {
    let arrondissementData = await fetch('http://localhost:3000/api/arrondissement')
    let arrondissements = await arrondissementData.json()
    let quartierData = await fetch('http://localhost:3000/api/quartier')
    let quartiers = await quartierData.json()
    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
               <Map arrondissements={arrondissements.data} quartiers={quartiers.data}/>
            </div>
        </div>);
}
