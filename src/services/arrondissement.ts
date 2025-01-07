import ApiService from "@/services/api";
import { TArrondissement } from "@/modules/arrondissement/type"
import { TDecla_Arrondissement } from "@/modules/declaarr/type"

export async function get(): Promise<TArrondissement[]> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getDeclarationArr(arrondissement : number): Promise<TDecla_Arrondissement> {
    const result = await fetch(`${ApiService.baseUrl}/decla_par_arrondissement/${arrondissement}`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getAllDeclarationArr(): Promise<TDecla_Arrondissement[]> {
    const result = await fetch(`${ApiService.baseUrl}/decla_par_arrondissement`, { method: 'GET' });
    const json = await result.json();
    return await json;
}