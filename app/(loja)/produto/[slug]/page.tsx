import {notFound} from "next/navigation";
import Link from "next/link";
import {getProductBySlug} from "@/lib/products"; 
import {formataBRL} from "@/lib/format"; 


export default async function ProductPage ({
    params,
}: {
    params: Promise<{slug:string}>;
}) {
    const {slug} = await params;      //pega apenas o resultado do slug
    const product = await getProductBySlug(slug);   //busca o produto pela camada de dados

    if (!product) {   // se voltou null, chama notFound(), que interrompe a renderização e mostra a página 404.
        notFound()
    }

    const semEstoque = product.stock ===0;  //pagina unica de cada produto
    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <Link href="/" className="text-sm text-gray-500 hover:text-amber-600">
            ← Voltar ao catálogo
          </Link>
    
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="flex h-72 items-center justify-center rounded-2xl bg-gray-100 text-7xl">
              🍺
            </div>
    
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-amber-700">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
              <span className="text-3xl font-bold text-gray-900">
                {formataBRL(product.priceInCents)}
              </span>
    
              {semEstoque ? (
                <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  Esgotado
                </span>
              ) : (
                <span className="text-sm text-green-700">
                  {product.stock} em estoque
                </span>
              )}
            </div>
          </div>
        </section>
      );
    }