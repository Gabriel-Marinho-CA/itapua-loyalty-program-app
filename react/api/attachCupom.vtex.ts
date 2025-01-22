export async function handleAttachCoupomToCart(id: string | number, cuponInCart: boolean, cupomID: string) {

    const url = `/api/checkout/pub/orderForm/${id}/coupons`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (!cuponInCart) {
        try {
            const request = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ text: cupomID }),
            })
            const response = await request.json();

            if (request.ok) {
                return response;
            }
        } catch (error) {
            throw new Error('error calling cupom api')
        }
    }
};