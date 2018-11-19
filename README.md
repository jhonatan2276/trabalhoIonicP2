## Jhonatan William Voltolini

# BackEnd (Remoto):

Utilizei como BackEnd da aplicação o Json Server, que nada mais é do que uma ferramenta que monitora um arquivo Json, possibilitando fazer as ações básicas de CRUD.

## Para instalar e configurar:

- 1 – Execute o comando “npm install -g json-server”;
- 2 – Após isso, navegue até a pasta do Json Server, onde se encontra o arquivo db.json;
- 3 – Executar o comando “json-server --host “IP DA MÁQUINA” --watch db.json”;
- 4 – Acessar a URL (http://IP DA MÁQUINA:3000/) via navegador, isso abrirá a página inicial do Json Server;
- 5 – Acessar o código fonte do projeto e navegar até a seguinte classe:
trabalhoIonicP2\src\app\services > acessar o arquivo global.service e alterar a variável “Ip” substituindo o valor pelo IP da máquina onde está o servidor (Json Server);

## Usuário para Login:
- User: admin1 Senha: admin
- User: admin2 Senha: admin

# Observações (Importante):

Não consegui fazer todos os tópicos do trabalho, perdi muito tempo (muito mesmo) com alguns componentes, e principalmente, sofri bastante por falta de experiência com o Angular em si, desse modo, “bati cabeça” com erros simples e demorei muito (fiquei empacado) em algumas funções, o que resultou em não conseguir alcançar 100% da atividade.
Assim, dos tópicos sugeridos não consegui fazer os seguintes:

- Local Storage (token);
- Infinite Scroll (até tentei, mas não haveria tempo hábil pra concluir isso);
- Os demais “tópicos grandes”, fiz todos.

Tive problemas com alguns itens (até gostaria de saber qual a forma correta de fazer), sendo eles:

- 1 – ion-datepicker (tive MUITO problema com isso e desisti de usar, pois dependendo do modo (usuário novo ou edição de usuário) ele dava retornos diferentes e erros que não consegui achar solução, nem revirando a internet, portanto substitui esse componente pelo DatePicker Nativo do Android);
OBS: No componente DatePicker do Android não consegui limitar a data, ou seja, não permitir a seleção de uma data futura. Eu segui a documentação colocando as instruções conforme estava no site do ionic, mas o componente simplesmente “ignorou” as condições, realmente não sei o pq.

- 2 – Não consegui dar o “refresh” na lista depois de salvar / deletar um registro (tentei de tudo), por isso, sempre que salvar ou deletar um registro é preciso fazer o “Pull to Refresh” para atualizar a lista.

- 3 - O Slide não consegui usar, o exemplo que copiei no site do próprio Ionic parecia estar bugado, dessa forma, substitui esse componente.

- 4 - Eu iria fazer o projeto Orientado a Objeto, porém só descobrir o modo correto de fazer quando estava com a metade do trabalho já encaminhada, portanto decidi mantê-lo do modo estruturado (verboso) mesmo.

No mais, tentei seguir a risca o exercício passado, mas infelizmente não consegui concluir 100%, mas não foi por falta de empenho, a inexperiência com Angular atrapalhou muito.
Acredito que de modo geral, consegui fazer uns 90% do trabalho, além do que, aprendi muito com isso, errando e acertando.
