"use client"
import { useEffect, useState } from "react";
import Map from "@/components/map/map";
import * as ArrondissementService from "@/services/arrondissement";
import * as DeclarationService from "@/services/declaration";
import * as QuartierService from "@/services/quartier";
import * as VoiesService from "@/services/voies";
import { TDeclaration } from "@/modules/declaration/type";
import { TArrondissement } from "@/modules/arrondissement/type";
import { TQuartier } from '@/modules/quartier/type';
import { TVoie } from '@/modules/voie/type';
import { ModeToggle } from "@/components/interface/theme";
import { Search } from "@/components/interface/search";


export default function Home() {
    const [arrondissements, setArrondissements] = useState<TArrondissement[]>([]);
    const [declarations, setDeclarations] = useState<TDeclaration[]>([]);
    const [quartiers, setQuartiers] = useState<TQuartier[]>([]);
    const [voies, setVoies] = useState<TVoie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const arrondissementsData = await ArrondissementService.get();
            setArrondissements(arrondissementsData);

            const quartiersData = await QuartierService.get();
            setQuartiers(quartiersData);

            const voiesData = await VoiesService.get();
            setVoies(voiesData);

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
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="relative h-[300px]">
                    <Search/>
                    <div className="absolute top-1 right-1"><ModeToggle /></div>

                </div>
            </div>
            <div className="w-3/4 h-[800px] self-center">
                <Map
                    arrondissements={arrondissements}
                    quartiers={quartiers}
                    declarations={declarations}
                    voies={voies}
                />
            </div>
        </div>
    );
}