import ApiService from "@/services/api";
import { TVoie } from "@/modules/voie/type";
import { TDecla_Voie } from "@/modules/declavoie/type";

export async function get(): Promise<TVoie[]> {
    const result = await fetch(`${ApiService.baseUrl}/voie`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getDeclarationVoie(voie : String): Promise<TDecla_Voie> {
    const result = await fetch(`${ApiService.baseUrl}/decla_par_voie/${voie}`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}