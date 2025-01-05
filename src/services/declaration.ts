import ApiService from "@/services/api";
import { TDeclaration } from "@/modules/declaration/type"

export async function get(page: number): Promise<TDeclaration[]> {
    const result = await fetch(`${ApiService.baseUrl}/declaration/${page}`, { method: 'GET' });
    const json = await result.json();
    return json.data;
}

export async function stat(): Promise<{total:number,pages:number}> {
    const result = await fetch(`${ApiService.baseUrl}/declaration`, { method: 'GET' });
    const json = await result.json();
    return json.data;
}