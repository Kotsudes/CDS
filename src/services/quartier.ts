import ApiService from "@/services/api";
import { TQuartier } from "@/modules/quartier/type"

export async function get(): Promise<TQuartier[]> {
    const result = await fetch(`${ApiService.baseUrl}/quartier`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getNames(): Promise<string[]> {
    const result = await fetch(`${ApiService.baseUrl}/quartier/name`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}