//Criado uma classe animais para deixar o código mais organizado e limpo
//tornando-o mais flexível para novas variáveis 
export class Animais {
    //utilização do export para poder ser utilizado na classes recintos-zoo
    constructor(nome, tamanho, listaBiomas, alimentacao) {
        this.nome = nome;
        this.tamanho = tamanho;
        this.listaBiomas = listaBiomas;
        this.alimentacao = alimentacao
    }
}