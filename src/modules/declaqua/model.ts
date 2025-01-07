import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Quartier {
    numberDeclarations: number;
    quartier: string;
    arrondissement: number;
}

export interface IDeclaQuartierDocument extends IDecla_Quartier, Mongo.Document { }


const decla_quartierSchema: Mongo.Schema = new Mongo.Schema({
    numberDeclarations: { type: Number },
    quartier: { type: String },
    arrondissement: { type: Number }
});

export default Mongo.model<IDeclaQuartierDocument>("quartierdeclarations", decla_quartierSchema);