"use client";
import React from "react";
import { AlertOctagon, BadgeCheck, Euro, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../_utils/CartApis";
import { useContext } from "react";
import { CartContext } from "../../_context/CartContext";

function ProductInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.documentId],
        },
      };
      console.log("Data being sent to Strapi:", product);

      CartApis.addToCart(data)
        .then((res) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: res?.data?.data?.documentId,
              product,
            },
          ]);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };
  return (
    <div>
      {product?.documentId ? (
        <div>
          <h2 className="text-[20px]">{product?.title}</h2>
          <h2 className="text-[16px] text-gray-400">{product?.category}</h2>
          <h2 className="text-[15px] mt-5">
            {product?.description[0]?.children[0].text}
          </h2>
          <h2 className=" flex gap-2 mt-2 items-center">
            {product?.instantDelivery ? (
              <BadgeCheck
                className="w-5 h-5 text-green-500
      "
              />
            ) : (
              <AlertOctagon />
            )}
            Eligible For Instant Delivery
          </h2>
          <h2 className="flex items-center text-[32px] text-primary mt-3 gap-1">
            {product?.price} <Euro className="" />
          </h2>

          <button
            onClick={() => handleAddToCart()}
            className="flex gap-2 p-3 text-white rounded-lg
      bg-primary hover:bg-teal-600"
          >
            <ShoppingCart /> Add to Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}

export default ProductInfo;
