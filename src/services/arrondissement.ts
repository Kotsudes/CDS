import ApiService from "@/services/api";

export async function get(): Promise<any> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}