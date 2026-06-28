import Link from "next/link";

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/*garante que o rodapé sempre fique no fundo da tela */ }
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"> {/*limita a largura e centraliza o conteúdo */ }
          <Link href="/" className="text-xl font-bold hover:text-amber-400 transition-colors">
            Uai Bar
          </Link>
          <Link
            href="/carrinho"
            className="text-sm font-medium hover:text-amber-400 transition-colors"
          >
            Carrinho
          </Link>
        </div>
      </header>

      <main className="flex-1"> {/*ocupa todo o espaço disponível entre o header e o footer */}
            {children}
      </main>

      <footer className="bg-gray-900 text-gray-400 text-center text-sm py-6">
  © {new Date().getFullYear()} UaiBar. Todos os direitos reservados.
</footer>
    </div>
  );
}
