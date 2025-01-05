import Mongo from "@/libs/database"
//import { EGeometryTypes } from "@/modules/libs/enums"

export interface IDecla_Arrondissement {
    numberDeclarations : number;
    arrondissement: number;
}

export interface IDeclaArrondissementDocument extends IDecla_Arrondissement, Mongo.Document { }


const quartierdeclarationsSchema: Mongo.Schema = new Mongo.Schema({
    numberDeclarations: { type: Number },
    arrondissement: { type: Number }
});

export default Mongo.models.quartierdeclarations ||
    Mongo.model<IDeclaArrondissementDocument>("quartierdeclarations", quartierdeclarationsSchema);