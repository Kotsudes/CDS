"use client"
import React from 'react'
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

export default function Map({ arrondissements, declarations, quartiers, voies }: { arrondissements: TArrondissement[], declarations: TDeclaration[],quartiers: TQuartier[], voies: TVoie[] }) {
    return (
        <MapContainer center={[48.8589, 2.3470]} zoom={13} scrollWheelZoom={false} style={{ height: '98vh', width: '100wh' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                <LayersControl.Overlay name="Arrondissements">
                    <LayerGroup>
                        {arrondissements.map(async (arrondissement: TArrondissement) => {
                            const coordinates = arrondissement.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord) => [coord[1], coord[0]]);
                                return <Polyline key={arrondissement._id} color='red' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{arrondissement.properties.l_ar}, {String(await ArrondissementService.getDeclarationArr(arrondissement.properties.c_ar))}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Rues">
                    <LayerGroup>
                        {voies.map(async (voie: TVoie) => {
                            const coordinates = voie.geometry.coordinates;
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord: LatLngExpression[] | LatLngExpression[]) => [coord[1], coord[0]]);
                                return <Polyline key={voie._id} color='blue' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{voie.properties.l_longmin}, {String(await VoieService.getDeclarationVoie(voie.properties.l_longmin))}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Quartiers">
                    <LayerGroup>
                        {quartiers.map(async (quartiers: TQuartier) => {
                            const coordinates = quartiers.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                                return <Polyline key={quartiers._id} color='purple' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{quartiers.properties.l_qu}, {String(await QuartierService.getDeclarationQua(quartiers.properties.l_qu))}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Déclarations">
                    <LayerGroup>
                        {declarations.map((declaration: TDeclaration) => {
                            const coordinates = declaration.geometry.coordinates;
                            if (coordinates && coordinates.length > 0) {
                                const positions: LatLngTuple = [coordinates[1], coordinates[0]];
                                return <Circle key={declaration._id} color='red' opacity={0.7} fill fillColor='red' fillOpacity={0.5} center={positions} radius={10}>
                                    <Tooltip>{declaration.properties.id_dmr}</Tooltip>
                                </Circle>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>

        </MapContainer>
    )
}
