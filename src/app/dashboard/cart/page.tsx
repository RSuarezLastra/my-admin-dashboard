import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Carrito de compras',
  description: 'SEO title'
}

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsCart: ProductInCart[] = [];

  Object.keys(cart).forEach(id => {
    const product = products.find(product => product.id === id);
    if (product) {
      productsCart.push({ product: product, quantity: cart[id] })
    }
  })

  return productsCart;
}

export default async function CartPage() {

  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number }
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev, 0)

  return (
    <div>
      <h2 className="text-3xl">Productos en el carrito</h2>

      <hr className="my-2" />

      <div className=" flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex flex-col w-full sm:w-8/12 gap-2">
          {
            productsInCart.map(({ product, quantity }) => (
              <ItemCard key={product.id} product={product} quantity={quantity} />
            ))
          }
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a Pagar">
            <div className="mt-2 flex justify-center">
              <h3 className="text-2xl font-semibold text-gray-700">${(totalToPay).toFixed(2)}</h3>
            </div>
            <span className="text-center font-semibold text-gray-500">iva 16%: ${(totalToPay * 0.16).toFixed(2)}</span>
          </WidgetItem>
        </div>

      </div>
    </div>
  );
}