"use client";
import { useEffect, useState } from "react";
import CartApis from "@/app/_utils/CartApis";

export default function TestAllProducts() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getAllCarts();
  }, []);

  // ✅ جلب كل عناصر السلة
  const getAllCarts = async () => {
    try {
      const res = await CartApis.getAllCarts();
      setCarts(res?.data?.data || []);
    } catch (error) {
      console.error("❌ Error fetching carts:", error);
    }
  };

  // ✅ حذف عنصر من السلة باستخدام cart.documentId
  const deleteCartItem = async (cartDocumentId) => {
    try {
      await CartApis.deleteCartItem(cartDocumentId);

      console.log("✅ Deleted Cart Item:", cartDocumentId);

      // ✅ تحديث الواجهة بعد الحذف
      setCarts((prev) =>
        prev.filter((item) => item.documentId !== cartDocumentId)
      );
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mb-5">My Cart Items</h2>

      {carts.map((item, index) => (
        <div
          key={item.documentId}
          className="flex justify-between items-center border p-3 mb-3"
        >
          <div>
            <p>🛒 Cart Doc ID: {item.documentId}</p>
            <p>📦 Product: {item?.products?.[0]?.title}</p>
            <p>💰 Price: {item?.products?.[0]?.price}</p>
          </div>

          <button
            onClick={() => deleteCartItem(item.documentId)}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
