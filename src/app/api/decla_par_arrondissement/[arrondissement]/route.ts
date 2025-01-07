//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaArr from "@/modules/declarartionArrondissement/model"
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, params: any): Promise<Response> {
    const ArrNumber = (await params).arrondissement;
    const geoJSONData = await DeclaArr.find({ arrondissement: ArrNumber }, "numberDeclarations").exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}