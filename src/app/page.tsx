"use client"
import { useEffect, useState } from "react";
import MyBarChart from "@/components/chart/chart";
import MyTop10 from "@/components/chart/top10";
import { useSearchParams } from 'next/navigation'
import * as ArrondissementService from "@/services/arrondissement";
import * as QuartierService from "@/services/quartier";
import * as VoiesService from "@/services/voies";
import { TArrondissement } from "@/modules/arrondissement/type";
import { TQuartier } from '@/modules/quartier/type';
import { TVoie } from '@/modules/voie/type';
import { ModeToggle } from "@/components/interface/theme";
import { Search } from "@/components/interface/search";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/map/map'), { ssr: false });

export default function Home() {
    const searchParams = useSearchParams()


    const [arrondissements, setArrondissements] = useState<TArrondissement[]>([]);
    const [quartiers, setQuartiers] = useState<TQuartier[]>([]);
    const [voies, setVoies] = useState<TVoie[]>([]);

    useEffect(() => {
        
        const fetchInitial = async () => {
            const arrondissementsData = await ArrondissementService.get();
            setArrondissements(arrondissementsData);

            const quartiersData = await QuartierService.get();
            setQuartiers(quartiersData);

            const voiesData = await VoiesService.get();
            setVoies(voiesData);
        };


        if(arrondissements.length === 0) {
            fetchInitial()
        };
    }, [arrondissements.length, searchParams]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 align-middle h-screen">
                <div className="w-3/4 h-[900px] self-center">
                    <Map
                        arrondissements={arrondissements}
                        quartiers={quartiers}
                        voies={voies}
                    />
                </div>
                <div className="flex flex-col self-center">
                    <div className="relative pr-5">
                        <Search />
                        <div className="absolute top-1 right-1"><ModeToggle /></div>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                <MyBarChart />
                <MyTop10 />
             
            </div>
        </div>
    );
}