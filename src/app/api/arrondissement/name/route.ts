import Quartiers, {IQuartier} from "@/modules/quartier/model";

export async function GET() {
    const geoJSONData = await Quartiers.find({}).sort({"properties.l_qu": 1}).select("properties.l_qu -_id").exec();

    const response = geoJSONData.map((quartier: IQuartier) => {
        return quartier.properties.l_qu        
    })

    return Response.json({ status: 200, data: response })
}