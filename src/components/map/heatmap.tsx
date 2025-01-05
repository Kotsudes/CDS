import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet.heat";
import { useSearchParams } from 'next/navigation'
import ApiService from "@/services/api";
// @ts-expect-error : Le plugin n'est pas typé
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';


export default function HeatmapLayer({

}) {
    const map = useMap();
    const searchParams = useSearchParams()
    const pointsMap = useRef<Map<string, number>>(new Map())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heatLayerRef2 = useRef<any>(null);



    useEffect(() => {
        if (!map) return;

        L.heatLayer([], {})


        const config = {
            radius: 0.0005, // Rayon des points
            maxOpacity: 0.5, // Opacité maximale
            scaleRadius: true, // Adapte le rayon selon le zoom
            useLocalExtrema: true, // Extrema local pour l'affichage
            latField: 'lat',
            lngField: 'lng',
            valueField: 'value',
        };

        // Ajouter la couche Heatmap à la carte
        heatLayerRef2.current = new HeatmapOverlay(config).addTo(map);


        async function fetchDataAndUpdate() {
            pointsMap.current = new Map();
            try {
                const response = await fetch(`${ApiService.baseUrl}/declaration/data?${searchParams.toString()}`, {
                    method: "GET",
                });

                const reader = response.body?.getReader();
                if (!reader) throw new Error("Stream non disponible");

                const decoder = new TextDecoder();
                let streamedData = "";
                let done = false;

                while (!done) {
                    const { value, done: streamDone } = await reader.read();
                    done = streamDone;

                    if (value) {
                        streamedData += decoder.decode(value, { stream: true });
                    }
                }

                // Maintenant que tout le flux est lu, traiter le JSON complet
                try {
                    const parsed: { key: string; value: number }[] = JSON.parse(streamedData);
                    parsed.forEach(({ key, value }) => {
                        if (pointsMap.current.has(key)) {
                            pointsMap.current.set(key, pointsMap.current.get(key)! + value);
                        } else {
                            pointsMap.current.set(key, value);
                        }
                    });

                    const formattedDataAlt = Array.from(pointsMap.current.entries()).map(([key, value]) => {
                        const [lat, lng] = key.split(",").map(Number);
                        return { lat: lat, lng: lng, value: value };
                    });

                    // Supprimer les anciennes données et ajouter les nouvelles

                    heatLayerRef2.current.setData({
                        max: 10, // Définissez une valeur max selon vos données
                        data: formattedDataAlt, // Données formatées
                    });
                } catch (error) {
                    console.error("Erreur lors du parsing du JSON complet : ", error);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        }

        fetchDataAndUpdate();


        return () => {
            if (map.hasLayer(heatLayerRef2.current)) {
                map.removeLayer(heatLayerRef2.current);
                heatLayerRef2.current = null;
            }
        };
    }, [map, searchParams]);

    return null;
};