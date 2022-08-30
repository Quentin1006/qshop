export declare class ProductsHelper {
    private applyDiscount;
    createPrice({ price, discount, discountType }: {
        price: any;
        discount: any;
        discountType?: string;
    }): {
        current: number;
        raw: any;
        discount: any;
        discountType: "percentage" | "raw";
    };
}
