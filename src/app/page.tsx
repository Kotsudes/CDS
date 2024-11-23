"use client"
import { useEffect, useState } from "react";
import Map from "@/components/map/map";
import * as ArrondissementService from "@/services/arrondissement";
import * as DeclarationService from "@/services/declaration";
import { TDeclaration } from "@/modules/declaration/type";
import { TArrondissement } from "@/modules/arrondissement/type";
import { TQuartier } from '@/modules/quartier/type';

export default function Home() {
    const [arrondissements, setArrondissements] = useState<TArrondissement[]>([]);
    const [declarations, setDeclarations] = useState<TDeclaration[]>([]);
    const [quartiers, setQuartiers] = useState<TQuartier[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const arrondissementsData = await ArrondissementService.get();
            setArrondissements(arrondissementsData);

            const quartiersData = await fetch('http://localhost:3000/api/quartier');
            const quartiers = await quartiersData.json();

            // const declarationsData = await DeclarationService.stat();

            //for (let i = 1; i < declarationsData.pages; i++) {
            for (let i = 0; i < 5; i++) {
                const pageDeclarations = await DeclarationService.get(i);
                setDeclarations((prevDeclarations) => [...prevDeclarations, ...pageDeclarations]);
                /*allDeclarations = allDeclarations.concat(pageDeclarations);
                setDeclarations([...allDeclarations]); // Mettre à jour l'état après chaque page
                console.log(declarations)*/
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map 
                    arrondissements={arrondissements} 
                    quartiers={quartiers}
                    declarations={declarations}
                />
            </div>
        </div>
    );
}