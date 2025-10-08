"use client";
import ProductApis from "@/app/_utils/ProductApis";
import React, { use, useEffect, useState } from "react";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

function ProductDetails({ params }) {
  //  فك الـ params باستخدام React.use
  const { productId } = React.use(params);

  const path = usePathname();

  const [productDetails, setProductDetails] = useState(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (!productId) return; // تأكد أنه موجود قبل استدعاء API

    const getProductById_ = async () => {
      try {
        const res = await ProductApis.getProductById(productId);
        setProductDetails(res.data.data); // خزّن البيانات
        getProductListByCategory(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProductById_();
  }, [productId]);

  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.category).then((res) => {
      setProductList(res?.data.data);
    });
  };
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />

      <div
        className="grid justify-around
        grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2"
      >
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>

      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
