import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Arrondissement {
    numberDeclarations : number;
    arrondissement: number;
}

export interface IDeclaArrondissementDocument extends IDecla_Arrondissement, Mongo.Document { }


const decla_arrondissementSchema: Mongo.Schema = new Mongo.Schema({
    numberDeclarations: { type: Number },
    arrondissement: { type: Number }
});

export default Mongo.model<IDeclaArrondissementDocument>("arrondissementdeclarations", decla_arrondissementSchema);