export async function getUserData() {
    try {
        const request = await fetch("/api/checkout/pub/orderForm");
        const response = await request.json();

        if (request.ok) {
            return response;
        }
        return null;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}