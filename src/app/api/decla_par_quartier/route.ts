//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaQua from "@/modules/declarartionQuartier/model"


export async function GET(): Promise<Response> {

    const geoJSONData = await DeclaQua.find().exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}