import Declaration_per_quartier from "@/modules/declarartionQuartier/model"

export async function GET() {
    const geoJSONData = await Declaration_per_quartier.find({},{_id: 0})
        .sort({ numberDeclarations: -1 }) // Tri décroissant par le nombre de déclarations
        .limit(10).exec();

    return Response.json({ status: 200, data: geoJSONData })
}