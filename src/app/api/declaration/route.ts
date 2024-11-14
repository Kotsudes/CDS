import Declarations from "@/modules/declaration/model"

export async function GET() {
    const geoJSONData = await Declarations.find({}).exec();

    return Response.json({ status: 200, data: geoJSONData })
}