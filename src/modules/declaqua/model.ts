import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Quartier {
    numberDeclarations: Number;
    quartier: String;
    arrondissement: Number;
}

export interface IDeclaQuartierDocument extends IDecla_Quartier, Mongo.Document { }


const decla_quartierSchema: Mongo.Schema = new Mongo.Schema({
    numberDeclarations: { type: Number },
    quartier: { type: String },
    arrondissement: { type: Number }
});

export default Mongo.model<IDeclaQuartierDocument>("declaration_per_quartier", decla_quartierSchema);