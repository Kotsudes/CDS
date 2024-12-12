import ApiService from "@/services/api";
import { TArrondissement } from "@/modules/arrondissement/type"

export async function get(): Promise<TArrondissement[]> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}

export async function getNames(): Promise<string[]> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement/name`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}