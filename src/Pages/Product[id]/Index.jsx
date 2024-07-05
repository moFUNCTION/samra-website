import { Stack } from "@chakra-ui/react";
import { ProductDataView } from "./Parts/ProductDataView/ProductDataView";
import { useGetProduct } from "../../@Firebase/Hooks/Products/useGetProduct[id]/useGetProduct";
import { useParams } from "react-router-dom";
import { RelatedProducts } from "./Parts/RelatedProducts/RelatedProducts";
import { useEffect } from "react";
export default function Index() {
  const { productId } = useParams();
  const product = useGetProduct({ id: productId });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  return (
    <Stack>
      <ProductDataView productId={productId} product={product} />
      <RelatedProducts
        categoryId={product.data?.categoryId}
        isProductLoading={product.loading}
        productId={productId}
      />
    </Stack>
  );
}
