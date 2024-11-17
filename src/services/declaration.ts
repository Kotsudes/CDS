import ApiService from "@/services/api";

export async function get(page: number): Promise<any> {
    const result = await fetch(`${ApiService.baseUrl}/declaration/${page}`, { method: 'GET' });
    return await result.json();
}

export async function stat(): Promise<any> {
    const result = await fetch(`${ApiService.baseUrl}/declaration`, { method: 'GET' });
    return await result.json();
}