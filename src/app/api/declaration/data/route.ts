import { NextRequest } from 'next/server'
import Declarations from "@/modules/declaration/model"

export async function GET(request: NextRequest, params: any): Promise<Response> {
    // const page = (await params).page;
    // const limit = 500;
    // const skip = page * limit;

    const categories = request?.nextUrl?.searchParams.get('categories')?.split('|') || [];
    const zones = request?.nextUrl?.searchParams.get('zones')?.split(',').map(Number) || [];
    const dateDebut = request?.nextUrl?.searchParams.get('dateDebut') || "";
    const dateFin = request?.nextUrl?.searchParams.get('dateFin') || "";
    const pointDepart: number[] = request?.nextUrl?.searchParams.get('pointDepart')?.split(',').map(Number) || [2.11, 48.9];
    const pointFin: number[] = request?.nextUrl?.searchParams.get('pointFin')?.split(',').map(Number) || [2.5, 48.7];

    try {
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const cursor = Declarations.aggregate([
                        {
                            $match: {
                                $and: [
                                    { "properties.type": { $in: categories } },
                                    { "properties.arrondissement": { $in: zones } },
                                    { "properties.datedecl": { $gte: new Date(dateDebut), $lte: new Date(dateFin) } },
                                    {
                                        "geometry.coordinates": {
                                            $geoWithin: {
                                                $box: [
                                                    [pointDepart[0], pointDepart[1]],
                                                    [pointFin[0], pointFin[1]],
                                                ],
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                lat: { $round: [{ $arrayElemAt: ["$geometry.coordinates", 1] }, 6] },
                                lng: { $round: [{ $arrayElemAt: ["$geometry.coordinates", 0] }, 6] },
                                value: { $literal: 1 }
                            },
                        },
                        {
                            $group: {
                                _id: {
                                    $concat: [
                                        { $toString: "$lat" },
                                        ",",
                                        { $toString: "$lng" }
                                    ]
                                },
                                value: { $sum: "$value" }
                            }
                        },
                        // { $skip: skip }, // Appliquer la pagination avec "skip"
                        // { $limit: limit }, // Limiter le nombre de documents retournés
                    ]).cursor();

                    controller.enqueue("[") // Start of the array
                    let isFirst = true;

                    for await (const doc of cursor) {

                        if (!isFirst) {
                            controller.enqueue(",");
                        }
                        else {
                            isFirst = false;
                        }

                        controller.enqueue(JSON.stringify({ key: doc._id, value: doc.value }));
                    }
                    controller.enqueue("]") // End of the array
                    controller.close();
                }
                catch (error) {
                    console.log(error)
                    controller.error("Erreur lors du streaming des données");
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "Erreur lors de la récupération des données" }),
            { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
