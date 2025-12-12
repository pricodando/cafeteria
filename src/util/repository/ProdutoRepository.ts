import { Produto } from "../model/Produto";

export interface IProdutoRepository {

    procurarPorId(id: number): void;

    listarTodos(): void;

    cadastrar(produto: Produto): void;

    atualizar(produto: Produto): void;

    deletar(id: number): void;

    darBaixa(id: number, quantidade: number): void;

    darEntrada(id: number, quantidade: number): void;

    transferirEstoque(idOrigem: number, idDestino: number, quantidade: number): void;

}