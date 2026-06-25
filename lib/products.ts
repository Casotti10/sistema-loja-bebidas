// camada de dados (mock). Na fase 5, a funçao getProducts ()
// vai buscar no postgressql - mas quem usa nao vai precisar mudar 

export type Product = { //define o molde do produto
    id:number;  
    slug: string; //identificador da url, ex: skol-350ml  
    name:string;
    description: string; 
    priceInCents: number; //preço em centavos (1290 = 12,90)
    category: string; 
    stock: number; //quantidade em estoque 
    imageUrl: string
};


//Lista de produtos de mentira (mock) 
const products: Product[] = [  //lista de produtos
    {
    id: 1,  
    slug: "heineken-600ml",
    name: "Heineken 600ml",
    description: "Cerveja puro malte, garrafa retornável 600ml.",
    priceInCents: 1290, 
    category: "Cervejas",
    stock: 48,
    imageUrl: "",
}, 

    {
    id: 2,
    slug: "vinho-cabeertnet0sauvigon",
    name: "vinho-Cabeertnet0sauvigon",
    description: "Vinho tinto seco, ecnorpado, 750ml", 
    priceInCents: 1290, //preço em centavos (1290 = 12,90)
    category: "Vinhos", 
    stock: 14, //quantidade em estoque 
    imageUrl: ""
}, 

{
    id: 3,
    slug: "whisky-jack-daniels-1l",
    name: "Whisky Jack Daniel's 1L",
    description: "Vinho tinto seco, ecnorpado, 750ml", 
    priceInCents: 1290, //preço em centavos (1290 = 12,90)
    category: "Destilados", 
    stock: 14, //quantidade em estoque 
    imageUrl: ""
}, 
{
    id: 4,
    slug: "vodka-absolut-1l",
    name: "Vodka Absolut 1L",
    description: "Vodka premium sueca, 1 litro.",
    priceInCents: 8990,
    category: "Destilados",
    stock: 0,
    imageUrl: "",
  },
  {
    id: 5,
    slug: "coca-cola-2l",
    name: "Coca-Cola 2L",
    description: "Refrigerante de cola, garrafa 2 litros.",
    priceInCents: 990,
    category: "Não Alcoólicos",
    stock: 200,
    imageUrl: "",
  },
  {
    id: 6,
    slug: "agua-tonica-350ml",
    name: "Água Tônica 350ml",
    description: "Água tônica gelada, lata 350ml.",
    priceInCents: 450,
    category: "Não Alcoólicos",
    stock: 80,
    imageUrl: "",
  },
];

export async function getProducts(): Promise<Product[]> { //porta de entrada dos dados - async busca no banco e a assncroniza.
  return products;
}


