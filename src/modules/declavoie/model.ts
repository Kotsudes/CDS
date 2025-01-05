import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Voie {
    voie: String;
    numberDeclarations : Number;
}

export interface IDeclaVoieDocument extends IDecla_Voie, Mongo.Document { }


const decla_voieSchema: Mongo.Schema = new Mongo.Schema({
    voie: { type: String },
    numberDeclarations: { type: Number }
});

export default Mongo.model<IDeclaVoieDocument>("declaration_per_voie", decla_voieSchema);