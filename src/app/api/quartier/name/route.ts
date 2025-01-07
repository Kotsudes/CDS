import Arrondissement, {IArrondissement} from "@/modules/arrondissement/model"

export async function GET() {
    const geoJSONData = await Arrondissement.find({}).sort({"properties.c_qu": 1}).select("properties.l_ar -_id").exec();

    const response = geoJSONData.map((arrondissement: IArrondissement) => {
        return arrondissement.properties.l_ar        
    })

    return Response.json({ status: 200, data: response })
}