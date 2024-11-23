import ApiService from "@/services/api";

export async function get(): Promise<any> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement`, { method: 'GET' });
    return await result.json();
}