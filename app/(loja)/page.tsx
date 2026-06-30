import { getCategories, getProducts } from "@/lib/products";
import ProductCard from "@/components/product-card";
import Link from "next/link";



export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const produtosFiltrados = categoria
    ? products.filter((product) => product.category === categoria)
    : products;
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo</h1>
        <p className="text-gray-500 mb-6">
          {produtosFiltrados.length} produtos disponíveis
        </p>
  
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/"
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              !categoria
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
            }`}
          >
            Todos
          </Link>
  
          {categories.map((category) => (
            <Link
              key={category}
              href={`/?categoria=${encodeURIComponent(category)}`}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                categoria === category
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );

    return (
    <section className="max-w-5xl mx-auto px-4 py-10">
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
