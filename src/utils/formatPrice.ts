export function formatPrice(price: number, currency: string = "₽", ): string {
    const value = new Intl.NumberFormat("ru-RU", {
        style: "decimal",
        maximumFractionDigits: 0,
    }).format(price)
    return `${value} ${currency}`
}