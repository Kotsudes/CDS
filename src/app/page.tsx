import Map from "@/components/map/map"
import * as ArrondissementService from "@/services/arrondissement"
import * as DeclarationService from "@/services/declaration"

export default async function Home() {
    const arrondissements = await ArrondissementService.get()
    const declarations = await DeclarationService.get(0)
    const quartierData = await fetch('http://localhost:3000/api/quartier')
    const quartiers = await quartierData.json()

    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map arrondissements={arrondissements.data} declarations={declarations.data} quartiers={quartiers.data}/>
            </div>
        </div>);
}
