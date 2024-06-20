import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

interface IProps {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({ categoryId, limit, searchParams }: IProps) => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link href={`/${product.slug}`} className=" w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" key={product.id}>
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt="product"
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt="product"
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">{product.price?.formatted.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find((section: any) => section.title === "shortDesc")?.description ||
                    ""
                ),
              }}
            ></div>
          )}
          <button className="w-max rounded-2xl right-1 ring-1 ring-alarm text-alarm py-2 px-4 text-xs hover:bg-alarm hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
