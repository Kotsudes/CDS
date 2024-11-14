import { EGeometryTypes } from "@/modules/libs/enums"

export type TVoie = {
    _id: string;
    type: string;
    geometry: {
        coordinates: [];
        type: EGeometryTypes;
    };
    properties: {
        n_sq_ar: number;
        c_ar: number;
        c_arinsee: number;
        l_ar: string;
        l_aroff: string;
        n_sq_co: number;
        surface: number;
        perimetre: number;
        geom_x_y: {
            lon: number;
            lat: number;
        }
    }
}