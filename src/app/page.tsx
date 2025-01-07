"use client"
import MyBarChart from "@/components/chart/chart";
import MyTop10 from "@/components/chart/top10";

import { ModeToggle } from "@/components/interface/theme";
import { Search } from "@/components/interface/search";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/map/map'), { ssr: false });

export default function Home() {

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 align-middle h-screen">
                <div className="w-3/4 h-[900px] self-center">
                    <Map/>
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