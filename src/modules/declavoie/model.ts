import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Voie {
    voie: string;
    numberDeclarations : number;
}

export interface IDeclaVoieDocument extends IDecla_Voie, Mongo.Document { }


const decla_voieSchema: Mongo.Schema = new Mongo.Schema({
    voie: { type: String },
    numberDeclarations: { type: Number }
});

export default Mongo.model<IDeclaVoieDocument>("voiedeclarations", decla_voieSchema);