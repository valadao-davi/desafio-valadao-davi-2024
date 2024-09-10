import { Animais } from "./animais-zoo";

class RecintosZoo {
    // declarar e estabelecer os recintos viaveis já vistos anteriormente no desafio
    recintosViaveis = [
        {
            numero: 1, 
            bioma: "savana", 
            tamanhoTotal: 10, 
            animaisExistentes:[ 
                //necessário tambem declarar o seu nome e sua alimentação para posteriormente implementar as regras do desafio
                {
                    nome: "MACACO", 
                    alimentacao: "onivoro"
                }
            ], 
            //inserir o quanto que sobra de disponivel com animais ja estabelecidos antes para futuros calculos
            espacoDisponivel: 7,
        },
        {
            numero: 2, 
            bioma: "floresta", 
            tamanhoTotal: 5, 
            animaisExistentes: "vazio",
            espacoDisponivel: 5
        },
        {
            numero: 3, 
            bioma: "savana e rio", 
            tamanhoTotal: 7, 
            animaisExistentes: [ 
                {
                    nome: "gazela", 
                    alimentacao: "vegetariano"
                }
            ], 
            espacoDisponivel: 5
        },
        {
            numero: 4, 
            bioma: "rio", 
            tamanhoTotal: 8, 
            animaisExistentes: "vazio",
            espacoDisponivel: 8
        },
        {
            numero: 5, 
            bioma: "savana", 
            tamanhoTotal: 9, 
            animaisExistentes: [
                {
                    nome: "leão", 
                    alimentacao: "carnivora" //animais carnivoros nao podem conviver com outras especies
                }
            ], 
            espacoDisponivel: 6
        }
    ]

    //retorna biomas disponiveis com base no bioma apropriado para aquele animal
    verificarBiomas(item, biomas){
        return biomas.some(bioma => item.bioma.includes(bioma))
    }

    /*Método que se utiliza como filtro de recintos para verificar se há animais existentes em um método e se esses animais são carnivoros
    onde return 0 -> retorna que esse item é valido para lista
    e -1 -> retorna que esse item tem que ser filtrado da lista
    */
    verificarAnimaisExistentes(listaRecintos, animalNome, alimentacaoAnimal){

        if(listaRecintos.animaisExistentes === "vazio") return 0; // se não há animais no recinto retorna o item como válido

        let espaçoExtra = 0 //inicia um valor de espaço extra que poderá ser acessado e utilizado posteriormente para cálculo de espaço disponível

        const possuiUmCarnivoroDiferente = listaRecintos.animaisExistentes.some(animalExistente => // utiliza o método 'some' como uma verificação da lista de recintos
            //para retornar itens que são carnivoros, e que são especies diferentes do animal que será alocado
            animalExistente.alimentacao === "carnivora" && (animalExistente.nome !== animalNome && animalExistente !== "vazio")
        )
        // se a variavel possuiUmCarnivoroDiferente possui itens ou animais que tem a alimentação diferente de carnivora
        if(possuiUmCarnivoroDiferente || (alimentacaoAnimal === "carnivora" && listaRecintos.animaisExistentes[0].alimentacao !== "carnivora")) {
            return -1 //o recinto como regra do desafio será filtrado de um dos recintos disponiveis
        }

        // se tem um recinto válido com especies diferentes do animal que será alocado
        if(listaRecintos.animaisExistentes[0].nome !== animalNome){
            espaçoExtra = 1; //atribuir um de valor de ocupação como uma das regras do desafio
        }
        return espaçoExtra //retorna essa variável que poderá ser utilizado posteriormente
    }
    //método que será utilizado em um map para formatar de uma forma ideal que o teste consiga ler e aprovar
    formatarResultado(itemListaRecintos, espacoOcupar, espacoExtra){
        const espacoLivre = itemListaRecintos.espacoDisponivel - espacoOcupar - espacoExtra // se tiver espaço extra ter -1 de espaço disponível
        return `Recinto ${itemListaRecintos.numero} (espaço livre: ${espacoLivre} total: ${itemListaRecintos.tamanhoTotal})`
    }

    //método que recebe apenas um nome e com base nesse nome automaticamente atribuir a um objeto com dados ja definidos pelo desafio
    criarAnimal(nome){
        //lista predefinidade de animais disponíveis com suas especificações como tamanho, biomas e alimentação
        const animaisDados = {
            "LEAO": { tamanho: 3, listaBiomas: ["savana"], alimentacao: "carnivora"},
            "LEOPARDO": { tamanho: 2, listaBiomas: ["savana"], alimentacao: "carnivora"},
            "CROCODILO": { tamanho: 3, listaBiomas: ["rio"], alimentacao: "carnivora"},
            "MACACO": { tamanho: 1, listaBiomas: ["savana", "floresta"], alimentacao: "onivoro"},
            "GAZELA": { tamanho: 2, listaBiomas: ["savana"], alimentacao: "onivoro"},
            "HIPOPOTAMO": { tamanho: 1, listaBiomas: ["savana", "floresta"], alimentacao: "onivoro"}
        }
        // o método vai fazer uma verificação se o nome recebido existe na lista predefinida
        const padrao = animaisDados[nome.toUpperCase()] // garante que o nome recebido esteja em upperCase para nao causar erros
        if(!padrao){ // se padrao nao conter valor, retorna animal inválido
            return {
                error: "Animal inválido"
            }
        }
        // se conter retorna para o método um objeto animal criado para ser usado durante o analisaRecintos
        return new Animais(nome, padrao.tamanho, padrao.listaBiomas, padrao.alimentacao)
    }
    analisaRecintos(animal, quantidade) {
        //garante que não vai receber quantidades inválidas
        if(quantidade <= 0) {
            return {
                erro: 'Quantidade inválida'
            }
        }
        //cria um animal com base no nome recebido utilizando o método criar animal
        const animalObj = this.criarAnimal(animal)
        //se esse objeto conter algum erro retornar para o código
        if(animalObj.error){
            return {
               erro: `${animalObj.error}`
            }
        }
        //calcula o espaço que será ocupado com base no tamanho do animal * a quantidade atribuida
        const espacoOcupar = animalObj.tamanho * quantidade
        //lista de recintos disponiveis que mostrara para o usuario
        const recintosDisponiveis = this.recintosViaveis //recebe a lista ja definida da classe
            .filter(itemListaRecintos => { // método que filtra apenas os itens que cumpra as seguintes condições:
                if (!this.verificarBiomas(itemListaRecintos, animalObj.listaBiomas)) return false; // 1 - ter o bioma em que o animal se adapta
                const espacoExtra = this.verificarAnimaisExistentes(itemListaRecintos, animalObj.nome, animalObj.alimentacao) // 2 - passar por uma série de verificações sobre animais existentes nos recintos
                if (espacoExtra === -1) return false; // 3 - ter animais carnívoros da mesma especie ou não ter animais carnivoros
                if(itemListaRecintos.espacoDisponivel < espacoOcupar + espacoExtra) return false // 4 - ter tamanhos que sejam maiores que as quantidades atendidas

                return true // se os itens passarem por todas essas condições serão passados para a lista final
            }) 
            // onde serão formatados com o formato desejado do teste do desafio
             .map(item => this.formatarResultado(item, espacoOcupar, this.verificarAnimaisExistentes(item, animalObj.nome, animalObj.alimentacao)))
            
            // se não tiver nenhum item na lista filtrada então mostrar que não há recinto viavel
            if(recintosDisponiveis.length === 0) {
                return {
                    erro: "Não há recinto viável"
                }
            } 
            // se tiver mostrar a lista filtrada de acordo com o formato do teste
            return {
                recintosViaveis: recintosDisponiveis
            }
            
        }
        
    }



export { RecintosZoo as RecintosZoo };
