import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Arrondissement {
    numberDeclarations : Number;
    arrondissement: Number;
}

export interface IDeclaArrondissementDocument extends IDecla_Arrondissement, Mongo.Document { }


const decla_arrondissementSchema: Mongo.Schema = new Mongo.Schema({
    numberDeclarations: { type: Number },
    arrondissement: { type: Number }
});

export default Mongo.model<IDeclaArrondissementDocument>("declaration_per_arrondissement", decla_arrondissementSchema);