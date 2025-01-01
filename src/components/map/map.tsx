"use client"
import React from 'react'
import { MapContainer, TileLayer, Polyline, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { TArrondissement } from "@/modules/arrondissement/type"
import { LatLngTuple } from 'leaflet';
import { TQuartier } from '@/modules/quartier/type';
import { TVoie } from '@/modules/voie/type';
import { LatLngExpression } from 'leaflet';
import BoxSelector from './boxSelector';
import HeatmapLayer from "./heatmap"; 

export const enum POSITION_CLASSES {
    bottomleft= 'leaflet-bottom leaflet-left',
    bottomright= 'leaflet-bottom leaflet-right',
    topleft= 'leaflet-top leaflet-left',
    topright= 'leaflet-top leaflet-right',
}


export default function Map({ arrondissements, quartiers, voies }: { arrondissements: TArrondissement[],quartiers: TQuartier[], voies: TVoie[] }) {
    return (
        <MapContainer center={[48.8589, 2.3470]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} className='z-0' attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer/>
            <BoxSelector position={POSITION_CLASSES.bottomright}/>
            <LayersControl position="topright">
                <LayersControl.Overlay name="Arrondissements">
                    <LayerGroup>
                        {arrondissements.map((arrondissement: TArrondissement) => {
                            const coordinates = arrondissement.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord) => [coord[1], coord[0]]);
                                return <Polyline key={arrondissement._id} color='red' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{arrondissement.properties.l_ar}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Rues">
                    <LayerGroup>
                        {voies.map((voie: TVoie) => {
                            const coordinates = voie.geometry.coordinates;
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord: LatLngExpression[] | LatLngExpression[]) => [coord[1], coord[0]]);
                                return <Polyline key={voie._id} color='blue' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{voie.properties.l_longmin}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Quartiers">
                    <LayerGroup>
                        {quartiers.map((quartiers: TQuartier) => {
                            const coordinates = quartiers.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
                                const positions: LatLngTuple[] = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                                return <Polyline key={quartiers._id} color='purple' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip sticky>{quartiers.properties.l_qu}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>           
        </MapContainer>
    )
}

