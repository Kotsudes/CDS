import Arrondissement from "@/modules/arrondissement/model"

export async function GET() {
    const geoJSONData = await Arrondissement.find({}).exec();

    return Response.json({ status: 200, data: geoJSONData })
}