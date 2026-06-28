import { getProducts } from "@/lib/products";
import ProductCard from "@/components/product-card";

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Catálogo
      </h1>
      <p className="text-gray-500 mb-8">
        {products.length} produtos disponíveis
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
