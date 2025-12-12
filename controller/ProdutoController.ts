import { Produto } from "../model/Produto"; 
import { IProdutoRepository } from "../repository/ProdutoRepository"; 
import { colors } from "../src/util/Colors"; 

export class ProdutoController implements IProdutoRepository {

    private listaProdutos: Array<Produto> = new Array<Produto>();
    public id: number = 0; 


    public procurarPorId(id: number): void {
        let buscaProduto = this.buscarNoArray(id); 

        if (buscaProduto != null) {
            buscaProduto.visualizar(); 
        } else {
            console.log(colors.fg.red, "\nO Produto ID: " + id 
                + " não foi encontrado!", colors.reset);
        }
    }

    public listarTodos(): void {
        for (let produto of this.listaProdutos){ 
            produto.visualizar(); 
        };
    }
    
    public cadastrar(produto: Produto): void {
        this.listaProdutos.push(produto); 
        console.log(colors.fg.green, "\nProduto ID:" + produto.getId() +
            " foi criado com sucesso!", colors.reset);
    }

    public atualizar(produto: Produto): void {
        let buscaProduto = this.buscarNoArray(produto.getId()); 

        if (buscaProduto !== null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto;
            console.log(colors.fg.green, 
                `\nProduto ID: ${produto.getId()} foi atualizado com sucesso!`, 
                colors.reset);
        } else {
            console.log(colors.fg.red, 
                `\nProduto ID: ${produto.getId()} não foi encontrado no estoque.`, 
                colors.reset);
        }
    }

    public deletar(id: number): void {
        let produto = this.buscarNoArray(id); 

        if (produto !== null) {
            this.listaProdutos.splice(this.listaProdutos.indexOf(produto), 1);
            console.log(colors.fg.green, `\nProduto ID: ${id} foi excluído com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nProduto ID: ${id} não foi encontrado no estoque.`, colors.reset);
        }
    }

    public darBaixa(id: number, quantidade: number): void {
        let produto = this.buscarNoArray(id);

        if (produto !== null) {
            if (produto.getQuantidade() >= quantidade) {
                
                produto.setQuantidade(produto.getQuantidade() - quantidade);
                
                this.atualizar(produto); 
                
                console.log(colors.fg.green, 
                    `\nBAIXA DE ESTOQUE: ${quantidade} unidades do Produto ID ${id} ( ${produto.getNome()} ) realizada com sucesso.`, 
                    colors.reset);
                
            } else {
                console.log(colors.fg.red, 
                    `\nERRO: Estoque insuficiente para o Produto ID ${id}. Estoque atual: ${produto.getQuantidade()}.`, 
                    colors.reset);
            }
        } else {
            this.procurarPorId(id); 
        }
    }

    public darEntrada(id: number, quantidade: number): void {
        let produto = this.buscarNoArray(id);

        if (produto !== null) {
            
            produto.setQuantidade(produto.getQuantidade() + quantidade);

            this.atualizar(produto);
            
            console.log(colors.fg.green, 
                `\nENTRADA DE ESTOQUE: ${quantidade} unidades do Produto ID ${id} ( ${produto.getNome()} ) adicionadas com sucesso.`, 
                colors.reset);

        } else {
            this.procurarPorId(id);
        }
    }

    public transferirEstoque(idOrigem: number, idDestino: number, quantidade: number): void {
        let produtoOrigem = this.buscarNoArray(idOrigem);
        let produtoDestino = this.buscarNoArray(idDestino);

        if (produtoOrigem === null) {
            console.log(colors.fg.red, `\nERRO: Produto de Origem ID ${idOrigem} não encontrado.`, colors.reset);
            return;
        }

        if (produtoDestino === null) {
            console.log(colors.fg.red, `\nERRO: Produto de Destino ID ${idDestino} não encontrado.`, colors.reset);
            return;
        }

        if (produtoOrigem.getQuantidade() < quantidade) {
            console.log(colors.fg.red, 
                `\nERRO: Estoque insuficiente na Origem ID ${idOrigem}. Estoque atual: ${produtoOrigem.getQuantidade()}.`, 
                colors.reset);
            return;
        }

        produtoOrigem.setQuantidade(produtoOrigem.getQuantidade() - quantidade);
        this.atualizar(produtoOrigem);

        produtoDestino.setQuantidade(produtoDestino.getQuantidade() + quantidade);
        this.atualizar(produtoDestino);

        console.log(colors.fg.green, 
            `\nTRANSFERÊNCIA CONCLUÍDA: ${quantidade} unidades transferidas do Produto ${idOrigem} para o Produto ${idDestino}.`, 
            colors.reset);
    }

    public gerarId(): number {
        return ++this.id; 
    }

    public buscarNoArray(id: number): Produto | null { 
        for (let produto of this.listaProdutos) { 
            if (produto.getId() === id)
                return produto; 
        }

        return null;
    }
}
