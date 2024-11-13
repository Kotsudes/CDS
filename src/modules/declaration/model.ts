import Mongo from "@/libs/database"
import { EGeometryTypes } from "@/modules/libs/enums"


export interface IDeclaration {
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

export interface IDeclarationDocument extends IDeclaration, Mongo.Document { }


const declarationSchema: Mongo.Schema = new Mongo.Schema({
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
        numero: {
            type: Number
        },
        type: {
            type: String
        },
        soustype: {
            type: String
        },
        adresse: {
            type: String
        },
        code_postal: {
            type: String
        },
        ville: {
            type: String
        },
        arrondissement: {
            type: Number
        },
        conseilquartier: {
            type: String
        },
        datedecl: {
            type: String
        },
        anneedecl: {
            type: String
        },
        moisdecl: {
            type: Number
        },
        prefixe: {
            type: String
        },
        intervenant: {
            type: String
        },
        id_dmr: {
            type: String
        },
        geo_point_2d: {
            lat: {
                type: Number
            },
            lon: {
                type: Number
            }
        },
        mois_annee_decla: {
            type: String
        },
    }
});

declarationSchema.index(
    {
        "geometry.coordinates": "2dsphere"
    }
);

export default Mongo.model<IDeclarationDocument>("cds", declarationSchema);