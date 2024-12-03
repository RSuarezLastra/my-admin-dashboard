// https://tailwindcomponents.com/component/e-commerce-product-card
'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"
import { Product } from "../data/products"
import { Star } from "./Star"
import { addProductToCart } from "@/shopping-cart/actions/actions"

export const ProductCard = ({ id, image, name, price, rating }: Product) => {

  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-sm">

      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={image}
          alt="product image" />
      </div>

      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">{name}</h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">

          {
            Array(rating).fill(0).map((x, i) => (
              <Star key={i} />
            ))
          }

          <span className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
            {rating.toFixed(1)}
          </span>
        </div>


        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">${price}</span>

          <div className="flex">
            <button
              onClick={onAddToCart}
              className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <IoAddCircleOutline size={25} />
            </button>
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <IoTrashOutline size={20} />
            </button>
          </div>

        </div>


      </div>
    </div>
  )
}