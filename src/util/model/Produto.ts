export class Produto {

    private _id: number;
    private _nome: string;
    private _preco: number;
    private _quantidade: number;

    constructor(id: number, nome: string, preco: number, quantidade: number) {
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._quantidade = quantidade;
    }

    public getId(): number {
        return this._id;
    }

    public setId(id: number) {
        this._id = id;
    }

    public getNome(): string {
        return this._nome;
    }

    public setNome(nome: string) {
        this._nome = nome;
    }

    public getPreco(): number {
        return this._preco;
    }

    public setPreco(preco: number) {
        this._preco = preco;
    }

    public getQuantidade(): number {
        return this._quantidade;
    }

    public setQuantidade(quantidade: number) {
        this._quantidade = quantidade;
    }

    public visualizar(): void {
        console.log("\n\n*******************");
        console.log("Dados do Produto:");
        console.log("*******************");
        console.log("ID: " + this._id);
        console.log("Nome: " + this._nome);
        console.log("Preço: R$ " + this._preco.toFixed(2));
        console.log("Quantidade: " + this._quantidade);
    }
}