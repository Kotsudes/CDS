import Mongo from "@/libs/database"
import { EGeometryTypes } from "@/modules/libs/enums"

export interface IVoie {
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

export interface IVoieDocument extends IVoie, Mongo.Document { }


const voieSchema: Mongo.Schema = new Mongo.Schema({
    type: {
        type: String
    },
    geometry: {
        coordinates: {
            type: Array
        },
        type: {
            enum: EGeometryTypes,
            type: String
        }
    },
    properties: {
        n_sq_ar: {
            type: String
        },
        c_ar: {
            type: Number
        },
        c_arinsee: {
            type: Number
        },
        l_ar: {
            type: String
        },
        l_aroff: {
            type: String
        },
        n_sq_co: {
            type: Number
        },
        surface: {
            type: Number
        },
        perimetre: {
            type: Number
        },
        geom_x_y: {
            lon: {
                type: Number
            },
            lat: {
                type: Number
            },
        }
    }
});

export default Mongo.model<IVoieDocument>("voie", voieSchema);