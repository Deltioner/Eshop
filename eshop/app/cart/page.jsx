"use client";
import { useEffect, useState } from "react";
import CartApis from "@/app/_utils/CartApis";
import { useRouter } from "next/navigation";

export default function TestAllProducts() {
  const [carts, setCarts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCarts();
  }, []);
// جلب كل عناصر السلة
  const getAllCarts = async () => {
    try {
      const res = await CartApis.getAllCarts();
      setCarts(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  //  حذف عنصر من السلة
 const deleteCartItem = async (cartDocumentId) => {
  try {
    await CartApis.deleteCartItem(cartDocumentId);

    console.log(" Deleted Cart Item:", cartDocumentId);

    //  احذف من صفحة test
    setCarts((prev) =>
      prev.filter((item) => item.documentId !== cartDocumentId)
    );

    // 2 احذف من CartContext (السلة في الهيدر)
    setCarts((prev) =>
      prev.filter((item) => item.documentId !== cartDocumentId)
    );

  } catch (error) {
    console.error(" Delete error:", error);
  }
};


  //  حساب المجموع الكلي
  const getTotalAmount = () => {
    return carts.reduce((total, item) => {
      const price = item?.products?.[0]?.price || 0;
      return total + price;
    }, 0);
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mb-5">My Cart Items</h2>

      {carts.map((item) => {
        const product = item?.products?.[0];

        return (
          <div
            key={item.documentId}
            className="flex justify-between items-center border p-3 mb-3"
          >
            <div>
              <p>🛒 Cart Doc ID: {item.documentId}</p>
              <p>📦 Product: {product?.title}</p>
              <p>💰 Price: ${product?.price}</p>
            </div>

            <button
              onClick={() => deleteCartItem(item.documentId)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        );
      })}

      {/*  جزء TOTAL + CHECKOUT */}
      <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
        <div className="w-screen max-w-lg space-y-4">
          <dl className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-between !text-base font-medium">
              <dt>Total</dt>
              <dd>${getTotalAmount()}</dd>
            </div>
          </dl>

          <div className="flex justify-end">
            <button
              onClick={() =>
                router.push(`/checkout?amount=${getTotalAmount()}`)
              }
              className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-gray-400 text-[12px] mt-3">
        Note: All Items will be sent via Email
      </h2>
    </div>
  );
}
