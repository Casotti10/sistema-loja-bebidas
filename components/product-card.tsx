import Link from "next/link";
import { Product } from "@/lib/products";
import { formataBRL } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {  {/*Recebe um prop chamado product e ela tem formato de Tipo product  */}


    
    const semEstoque = product.stock === 0; {/*boolean indicando que o produto esta esgotado*/}

    return (
        <Link 
            href={`/produto/${product.slug}`}
      className="flex flex-col bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden" 
    >
        <div className= "h-48 bg-gray-100 flex items-center justify-center text-4x1">
            🍺
        </div>

        <div className="p-4 flex-1 flex flex-col gap-2 p-4 flex-1"> 
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full w-fit">
            {product.category}
            </span>   

        <h2 className="text-lg font-bold text-gray-900 leagind-snug">
            {product.name}
        </h2>

        <p className="text-sm text-gray-500 flex-1">
          {product.description}
        </p> 

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">
            {formataBRL(product.priceInCents)}
          </span>

        {semEstoque && (      /*{so renderiza se a condição for verdadeira }*/
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
              Esgotado
            </span>
          )}
        </div>
      </div>
    </Link>

    );
}