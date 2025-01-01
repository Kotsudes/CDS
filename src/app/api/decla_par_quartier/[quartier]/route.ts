//import { declarationsByArrondissement } from "@/libs/database/function"
import DeclaQua from "@/modules/declaqua/model"
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, params: any): Promise<Response> {
    const QuaName = (await params).quartier ;
    const geoJSONData = await DeclaQua.find({quartier : QuaName},"numberDeclarations").exec();

    return new Response(JSON.stringify(geoJSONData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}