"use client"
import { useEffect, useState } from "react";
import Map from "@/components/map/map";
import MyBarChart from "@/components/chart/chart";
import MyTop10 from "@/components/chart/top10";
import * as ArrondissementService from "@/services/arrondissement";
import * as DeclarationService from "@/services/declaration";
import * as QuartierService from "@/services/quartier";
import * as VoiesService from "@/services/voies";
import { TDeclaration } from "@/modules/declaration/type";
import { TArrondissement } from "@/modules/arrondissement/type";
import { TQuartier } from '@/modules/quartier/type';
import { TVoie } from '@/modules/voie/type';
import { Switch, Label, TypographyH2, TypographyH4 } from "@/components/ui";
import { ModeToggle } from "@/components/interface/theme";

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
        
        <div className="grid grid-cols-[7.5fr,2.5fr]">
            <div className="w-full h-screen flex flex-col overflow-y-auto">
                <div className="flex-shrink-0 h-[80vh]">
                    <Map
                        arrondissements={arrondissements}
                        quartiers={quartiers}
                        declarations={declarations}
                        voies={voies}
                    />
                </div>
                <div className="flex-shrink-0 mt-10 ">
                    <MyBarChart />
                </div>
                <div className="flex-shrink-0 mt-10 ">
                    <MyTop10 />
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="relative">
                        <span className="col-span-2 text-center">
                            <TypographyH2>Données</TypographyH2>
                        </span>
                        <div className="absolute top-1 right-1"><ModeToggle /></div>
                    </div>
                    <div className="grid grid-cols-2">
                        <Label htmlFor="arrondissements" className=""><TypographyH4>Arrondissements</TypographyH4></Label>
                        <Switch id="arrondissements" />
                    </div>
                </div>
            </div>
        </div>

    );
}