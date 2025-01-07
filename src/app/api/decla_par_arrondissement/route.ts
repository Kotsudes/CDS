//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaArr from "@/modules/declarartionArrondissement/model"

export async function GET(): Promise<Response> {
    const geoJSONData = await DeclaArr.find().exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}