//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaVoie from "@/modules/declavoie/model"
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, params: any): Promise<Response> {
    const VoieName = (await params).voie ;
    const geoJSONData = await DeclaVoie.find({_id : VoieName},"count").exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}