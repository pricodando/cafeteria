import readlinesync = require("readline-sync");

import { Produto } from './src/model/Produto';
import { colors } from './src/util/Colors';
import { ProdutoController } from './src/controller/ProdutoController';

export function main() {

    let produtos: ProdutoController = new ProdutoController();

    console.log("\nCriar Produtos de Teste\n");

    let p1: Produto = new Produto(produtos.gerarId(), "Cappuccino", 15.00, 50, "2026-12-31");
    produtos.cadastrar(p1);

    let p2: Produto = new Produto(produtos.gerarId(), "Mocha V12", 20.00, 30, "2026-12-31");
    produtos.cadastrar(p2);

    produtos.listarTodos();

    let opcao, id, preco, quantidade, validade: number;
    let nome: string;

    const tiposProdutos = ['Café Quente', 'Café Gelado', 'Comida'];

    while (true) {

        console.log(colors.bg.black, colors.fg.yellow, "*");
        console.log("                                                         ");
        console.log("              CAFETERIA 'CODE AND COFFEE'                ");
        console.log("                                                         ");
        console.log("*");
        console.log("                                                         ");

        console.log(" 1 - Cadastrar Novo Produto"                              );
        console.log(" 2 - Listar todos os Produtos"                            );
        console.log(" 3 - Buscar Produto por ID"                               );
        console.log(" 4 - Atualizar Dados do Produto"                          );
        console.log(" 5 - Apagar Produto"                                      );
        console.log(" 6 - Dar Baixa no Estoque (Venda)"                        );
        console.log(" 7 - Dar Entrada no Estoque (Compra)"                     );
        console.log(" 8 - Transferir Estoque entre Setores"                    );
        console.log(" 9 - Sair"                                                );
        console.log(" "                                                        );

        console.log("*");
        console.log("                                              ", colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log(colors.fg.yellow,
                "\nCafeteria 'Code and Coffee' - Volte sempre!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {

            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCadastrar Produto\n\n", colors.reset);

                console.log("Digite o Nome do Produto: ");
                nome = readlinesync.question("");

                console.log("Digite o Preço do Produto (R$): ");
                preco = readlinesync.questionFloat("");

                console.log("Digite a Quantidade Inicial em Estoque: ");
                quantidade = readlinesync.questionInt("");

                console.log("Digite a Validade (AAAA-MM-DD): ");
                let validadeInput = readlinesync.question("");

                produtos.cadastrar(
                    new Produto(produtos.gerarId(), nome, preco, quantidade, validadeInput)
                );

                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todos os Produtos\n\n", colors.reset);

                produtos.listarTodos();

                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nConsultar dados do Produto - por ID\n\n", colors.reset);

                console.log("Digite o ID do Produto: ");
                id = readlinesync.questionInt("");

                produtos.procurarPorId(id);

                keyPress();
                break;

            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados do Produto\n\n", colors.reset);

                keyPress();
                break;

            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar um Produto\n\n", colors.reset);

                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nDar Baixa no Estoque (Venda)\n\n", colors.reset);

                keyPress();
                break;

            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDar Entrada no Estoque (Compra)\n\n", colors.reset);

                keyPress();
                break;

            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferência de Estoque entre Setores\n\n", colors.reset);

                keyPress();
                break;

            default:
                console.log(colors.fg.whitestrong,
                    "\nOpção Inválida!\n", colors.reset);

                keyPress();
                break;
        }
    }
}

export function sobre(): void {
    console.log("\n*");
    console.log("Projeto Desenvolvido por: Priscila Rocha");
    console.log("Generation Brasil - priscilar@genstudents.org");
    console.log("github.com/pricodando");
    console.log("*");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();