import Declarations from "@/modules/declaration/model"

export async function GET(_,urlParams): Promise<Response> {
    const params = (await urlParams)
    const page = (await params.params).page || 0;
    const limit = 500;
    const skip = page * limit;

    const geoJSONData = await Declarations.find({})
        .skip(skip)
        .limit(limit)
        .exec();
    return Response.json({ status: 200, data: geoJSONData })
}