import Mongo from "@/libs/database"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICategory {
}

export interface ICategoryDocument extends ICategory, Mongo.Document { }


const categorySchema: Mongo.Schema = new Mongo.Schema({
    "_id": {
        type: String,
    }
});

export default Mongo.models.categories ||
    Mongo.model<ICategoryDocument>("categories", categorySchema);