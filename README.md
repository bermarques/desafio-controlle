- A biblioteca ant design(https://ant.design/components/overview/) deve ser usada para os componentes de formulário, modal e botão;
- Se necessário, utilize o styled-components para estilizar(botão de salvar por exemplo);
- Ao clicar no botão de salvar, deve ser usado o método onFinish para mostrar no console do browser os valores do formulário;
- Ao clicar em 'X'(canto superior direito da tela) deverá ser possível fechar o modal, e mostrar uma tela em branco com apenas um botão qualquer para abrir o modal;
- Regras:
  - Utilizar a biblioteca dayjs para o campo de data, o formato de saída deve ser DD-MM-YYYY
  - Deverá ser possível adicionar vários itens
  - Deverá ser possível remover um item já inserido
  - Pelo menos um item deve existir no formulário, ou seja, o botão de excluir('X') só deve aparecer a partir do segundo item adicionado.
  - O cálculo de subtotal e valor total deve levar em conta o desconto e os valores/quantidades de cada item inserido
  - Os valores em tela devem ser reativos
  - Não é necessário validação dos campos: "Cliente" ou "Validade do orçamento".Apenas deverá ser obrigatório o preenchimento do campo "Título" e de pelo menos um item.
