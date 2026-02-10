import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";

function ProductItem({ product }) {
  return (
    <div
      className="p-2 border-teal-400
   rounded-lg hover:border hover:shadow-md hover:cursor-pointer"
    >
      <Link href={`/product-details/${product?.documentId}`}>
        <Image
          src={product?.banner?.[0]?.url}
          width={200}
          height={200}
          alt="banner background"
          className="rounded-t-lg  h-[230px] w-[400px] object-cover"
        />

        <div className="flex justify-between p-3 items-center bg-gray-50 rounded-b-lg">
          <div className="">
            <h2 className="text-[14px] font-medium">{product?.title}</h2>
            <h2 className="text-[12px] font-semibold text-gray-900 flex gap-2 items-center">
              <List className="w-4 h-4" />
              {product?.category}
            </h2>
          </div>
          <h2 className="">€{product?.price}</h2>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
