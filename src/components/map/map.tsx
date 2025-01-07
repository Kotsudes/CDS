"use client"
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Tooltip, LayersControl, LayerGroup, Circle } from 'react-leaflet'
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
import * as DeclarationService from "@/services/declaration";


export default function Map() {
    const [arrondissementData, setArrondissementData] = useState<any[]>([]);
    const [voieData, setVoieData] = useState<any[]>([]);
    const [quartierData, setQuartierData] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données
                const arrondissementsData = await ArrondissementService.get();
                const quartiersData = await QuartierService.get();
                const voiesData = await VoieService.get();
                
                // Préparation des données supplémentaires
                const arrondissementsWithDeclarations = await Promise.all(
                    arrondissementsData.map(async (arrondissement) => ({
                        ...arrondissement,
                        declarationCount: await ArrondissementService.getDeclarationArr(arrondissement.properties.c_ar),
                    }))
                );
                setArrondissementData(arrondissementsWithDeclarations);

                const voiesWithDeclarations = await Promise.all(
                    voiesData.map(async (voie) => ({
                        ...voie,
                        declarationCount: await VoieService.getDeclarationVoie(voie.properties.l_longmin),
                    }))
                );
                setVoieData(voiesWithDeclarations);

                const quartiersWithDeclarations = await Promise.all(
                    quartiersData.map(async (quartier) => ({
                        ...quartier,
                        declarationCount: await QuartierService.getDeclarationQua(quartier.properties.l_qu),
                    }))
                );
                setQuartierData(quartiersWithDeclarations);
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
                            const coordinates = arrondissement.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
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
                                            {arrondissement.properties.l_ar}, {arrondissement.declarationCount}
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
                            const coordinates = voie.geometry.coordinates;
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord: LatLngTuple) => [coord[1], coord[0]]);
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
                                            {voie.properties.l_longmin}, {voie.declarationCount}
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
                            const coordinates = quartier.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
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
                                            {quartier.properties.l_qu}, {quartier.declarationCount}
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