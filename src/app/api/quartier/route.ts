import Quartiers from "@/modules/quartier/model"

export async function GET() {
    const geoJSONData = await Quartiers.find({}).exec();

    return Response.json({ status: 200, data: geoJSONData })
}