"use client"
import React from 'react'
import { MapContainer, TileLayer, Polyline, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { TArrondissement } from "@/modules/arrondissement/type"


export default function Map({ arrondissements }: { arrondissements: TArrondissement[] }) {

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
                        {arrondissements.map((arrondissement: any) => {
                            const coordinates = arrondissement.geometry.coordinates[0];
                            if (coordinates && coordinates.length > 0) {
                                const positions = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                                return <Polyline key={arrondissement._id} color='red' opacity={0.2} fill fillColor='black' fillOpacity={0.1} positions={positions} >
                                    <Tooltip>{arrondissement.properties.l_ar}</Tooltip>
                                </Polyline>
                            }
                            return null;
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Rues">
                    <LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Évènements">
                    <LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>

        </MapContainer>
    )
}
