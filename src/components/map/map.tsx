"use client"
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { TArrondissement } from "@/modules/arrondissement/type"
import { TDeclaration } from '@/modules/declaration/type';
import { LatLngTuple } from 'leaflet';
import { TQuartier } from '@/modules/quartier/type';
import { TVoie } from '@/modules/voie/type';
import { LatLngExpression } from 'leaflet';
import * as ArrondissementService from "@/services/arrondissement";
import * as QuartierService from "@/services/quartier";
import * as VoieService from "@/services/voies";
import { TDecla_Arrondissement } from '@/modules/declaarr/type';
import { TDecla_Voie } from '../../modules/declavoie/type';
import { TDecla_Quartier } from '../../modules/declaqua/type';


export default function Map() {
    const [arrondissementData, setArrondissementData] = useState<TArrondissement[]>([]);
    const [voieData, setVoieData] = useState<TVoie[]>([]);
    const [quartierData, setQuartierData] = useState<TQuartier[]>([]);

    const [arrondissementDecla, setArrondissementDecla] = useState<TDecla_Arrondissement[]>([]);
    const [voieDecla, setVoieDecla] = useState<TDecla_Voie[]>([]);
    const [quartierDecla, setQuartierDecla] = useState<TDecla_Quartier[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données
                const arrondissementsData = await ArrondissementService.get();
                const quartiersData = await QuartierService.get();
                const voiesData = await VoieService.get();

                setArrondissementData(arrondissementsData);
                setVoieData(voiesData);
                setQuartierData(quartiersData);

                const arronDecla = await ArrondissementService.getAllDeclarationArr();
                const quartierDecla = await QuartierService.getAllDeclarationQua();
                const voieDecla = await VoieService.getAllDeclarationVoie();
                
                setArrondissementDecla(arronDecla);
                setVoieDecla(voieDecla);
                setQuartierDecla(quartierDecla);

                // Préparation des données supplémentaires
                /* const arrondissementsWithDeclarations = await Promise.all(
                    arrondissementsData.map(async (arrondissement) => ({
                        ...arrondissement,
                        declarationCount: await ArrondissementService.getDeclarationArr(arrondissement.properties.c_ar),
                    }))
                );
              

                const voiesWithDeclarations = await Promise.all(
                    voiesData.map(async (voie) => ({
                        ...voie,
                        declarationCount: await VoieService.getDeclarationVoie(voie.properties.l_longmin),
                    }))
                );
               

                const quartiersWithDeclarations = await Promise.all(
                    quartiersData.map(async (quartier) => ({
                        ...quartier,
                        declarationCount: await QuartierService.getDeclarationQua(quartier.properties.l_qu),
                    }))
                );*/
              
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapContainer
            center={[48.8589, 2.347]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "98vh", width: "100wh" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                <LayersControl.Overlay name="Arrondissements">
                    <LayerGroup>
                        {arrondissementData.map((arrondissement) => {
                            const data = arrondissementDecla.filter((decla)=> decla.arrondissement === arrondissement.properties.c_ar);
                            const coordinates = arrondissement.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0 && data.length > 0) {
                                const positions = coordinates.map((coord) => [coord[1], coord[0]]);
                                return (
                                    <Polyline
                                        key={arrondissement._id}
                                        color="red"
                                        opacity={0.2}
                                        fill
                                        fillColor="black"
                                        fillOpacity={0.1}
                                        positions={positions}
                                    >
                                        <Tooltip sticky>
                                            {arrondissement.properties.l_ar}, {data[0].numberDeclarations}
                                           
                                        </Tooltip>
                                    </Polyline>
                                );
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Rues">
                    <LayerGroup>
                        {voieData.map((voie) => {
                            const data = voieDecla.filter((decla)=> decla.voie === voie.properties.l_longmin);
                            const coordinates = voie.geometry.coordinates;
                            if (coordinates && coordinates.length > 0 && data.length > 0) {
                                const positions = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                                return (
                                    <Polyline
                                        key={voie._id}
                                        color="blue"
                                        opacity={0.2}
                                        fill
                                        fillColor="black"
                                        fillOpacity={0.1}
                                        positions={positions}
                                    >
                                        <Tooltip sticky>
                                            {voie.properties.l_longmin}, {data[0].numberDeclarations}
                                        </Tooltip>
                                    </Polyline>
                                );
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Quartiers">
                    <LayerGroup>
                        {quartierData.map((quartier) => {
                            const data = quartierDecla.filter((decla)=> decla.quartier === quartier.properties.l_qu);
                            const coordinates = quartier.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0 && data.length > 0) {
                                const positions = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                                return (
                                    <Polyline
                                        key={quartier._id}
                                        color="purple"
                                        opacity={0.2}
                                        fill
                                        fillColor="black"
                                        fillOpacity={0.1}
                                        positions={positions}
                                    >
                                        <Tooltip sticky>
                                            {quartier.properties.l_qu}, {data[0].numberDeclarations}
                                        </Tooltip>
                                    </Polyline>
                                );
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
}