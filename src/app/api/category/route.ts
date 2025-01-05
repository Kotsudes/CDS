import Categories from "@/modules/category/model"

export async function GET() {
    const geoJSONData = await Categories.find().exec();
    console.log(geoJSONData)
    

    return Response.json({ status: 200, data: geoJSONData })
}