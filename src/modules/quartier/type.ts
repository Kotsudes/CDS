import { EGeometryTypes } from "@/modules/libs/enums"

export type TQuartier = {
    _id: string;
    type: string;
    geometry: {
        coordinates: [][];
        type: EGeometryTypes;
    };
    properties: {
        n_sq_qu: number;
        c_qu: number;
        c_quinsee: number;
        l_qu: string;
        c_ar: number;
        l_quoff: string;
        n_sq_co: number;
        surface: number;
        perimetre: number;
        geom_x_y: {
            lon: number;
            lat: number;
        }
    }
}