const brlFomarmatter = new Intl.NumberFormat("pt-BR", {   //criando um objeto para formatar numeros no padrao brasileiro 
    style: "currency",                      // INTL -> Api nativa do JS  que formata numeros conforme o país
    currency : "BRL"
});  


export function formataBRL (priceInCents : number) : string { //função para formatar numero real em centavos
    return brlFomarmatter.format(priceInCents / 100);
}
