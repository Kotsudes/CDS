import Voies from "@/modules/voie/model"

export async function GET() {
    const geoJSONData = await Voies.find({}).exec();

    return Response.json({ status: 200, data: geoJSONData })
}