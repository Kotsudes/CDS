import Declarations from "@/modules/declaration/model"

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const limit = 500;
    const skip = page * limit;

    const geoJSONData = await Declarations.find({})
        .skip(skip)
        .limit(limit)
        .exec();
    return Response.json({ status: 200, data: geoJSONData })
}