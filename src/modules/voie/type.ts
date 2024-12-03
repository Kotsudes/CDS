import { EGeometryTypes } from "@/modules/libs/enums"

export type TVoie = {
    _id: string;
    type: string;
    geometry: {
        coordinates: [][];
        type: EGeometryTypes;
    };
    properties: {
        n_sq_vo: number;
        c_coinsee: number;
        c_desi: string;
        c_liaison: string;
        l_voie: string;
        l_courtmin: string;
        l_longmin: string;
        c_voie: string;
        b_fantoir: string;
        b_off:string;
        c_voie_vp: string;
        objectid: number;
        c_domoff: string;
        n_sq_co: number;
        length: number;
        geom_x_y: {
            lon: number;
            lat: number;
        }
    }
}