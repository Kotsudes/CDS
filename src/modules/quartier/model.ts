import Mongo from "@/libs/database"
import { EGeometryTypes } from "@/modules/libs/enums"

export interface IQuartier {
    type: string;
    geometry: {
        coordinates: [];
        type: EGeometryTypes;
    };
    properties: {
        n_sq_qu: number;
        c_qu: number;
        c_quinsee: number;
        l_qu: string;
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

export interface IQuartierDocument extends IQuartier, Mongo.Document { }


const quartierSchema: Mongo.Schema = new Mongo.Schema({
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
        n_sq_qu: {
            type: String
        },
        c_qu: {
            type: Number
        },
        c_quinsee: {
            type: Number
        },
        l_qu: {
            type: String
        },
        l_quoff: {
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

export default Mongo.models.quartiers ||
    Mongo.model<IQuartierDocument>("quartiers", quartierSchema);