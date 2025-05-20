export interface Size {
  name: string;      // Size name (e.g., "S", "M", "L")
  quantity: number;  // Quantity available in this size
}

export interface Product {
  id:number;
  imageUrl: string;            // URL to the product image
  brand: string;               // Brand of the product
  title: string;               // Title of the product
  color: string;               // Color of the product
  discountedPrice: number;     // Price after discount
  price: number;               // Original price
  discountPercent: number;     // Discount percentage
  size: Size[];                // Array of sizes with quantities
  quantity: number;            // Total quantity available
  topLevelCategory: string;    // First level category (e.g., "Men")
  secondLevelCategory: string;  // Second level category (e.g., "Clothing")
  thirdLevelCategory: string;   // Third level category (e.g., "men_jeans")
  description: string;         // Description of the product
}