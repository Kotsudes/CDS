import ApiService from "@/services/api";
import { TQuartier } from "@/modules/quartier/type"
import { TDecla_Quartier } from "@/modules/declarartionQuartier/type"

export async function get(): Promise<TQuartier[]> {
    const result = await fetch(`${ApiService.baseUrl}/quartier`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getDeclarationQua(quartier : String): Promise<TDecla_Quartier> {
    const result = await fetch(`${ApiService.baseUrl}/decla_par_quartier/${quartier}`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getTop10Quartier(): Promise<TDecla_Quartier[]> {
    const result = await fetch(`${ApiService.baseUrl}/quartier/top10`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}