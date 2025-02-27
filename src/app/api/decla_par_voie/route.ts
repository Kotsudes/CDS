//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaVoie from "@/modules/declarartionVoie/model"

export async function GET(): Promise<Response> {
    const geoJSONData = await DeclaVoie.find().exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}