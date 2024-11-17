import Declarations from "@/modules/declaration/model"

export async function GET(): Promise<Response> {

    const declartionsCount = await Declarations.countDocuments({});
    return Response.json({
        status: 200, data: {
            total: declartionsCount,
            pages: Math.floor(declartionsCount / 500)
        }
    })
}