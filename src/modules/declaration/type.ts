import { EGeometryTypes } from "@/modules/libs/enums"

export type TDeclaration = {
    _id: string;
    type: string;
    geometry: {
        coordinates: [];
        type: EGeometryTypes;
    };
    properties: {
        numero: number;
        type: string;
        soustype: string;
        adresse: string;
        code_postal: string;
        ville: string;
        arrondissement: number;
        conseilquartier: string;
        datedecl: string;
        anneedecl: string;
        moisdecl: number;
        prefixe: string;
        intervenant: string;
        id_dmr: string;
        geo_point_2d: {
            lon: number;
            lat: number;
        };
        mois_annee_decla: string;
    }
}