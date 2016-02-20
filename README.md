ALUNOS: ALISSON MATOS,FELIPE RANGEL E JOÃO EDUARDO.

O compilador .Net Compiler Platform foi criado em 2010 pela Microsoft para as linguagens C# e Visual Basic, primeiramente conhecido com o codenome “Roslyn”. Começou como apenas uma extensão do Visual Studio 2010 SP1 e hoje, é o compilador padrão do C# 6 e está junto do .Net 4.6.

Utilizando uma licença MIT, totalmente OpenSource, este compilador torna a compilação transparente, facilitando o desenvolvimento de ferramentas para geração, análise e refatoração de código. Além disso, diminui significativamente a complexidade de soluções de scripting e de programação interativa com VB e C#.

O Roslyn foi criado com a missão de prover infraestrutura para outras ferramentas que precisam parsear código em C# e VB.Net, eliminar os diversos serviços de compilação parcial que a Microsoft e terceiros tinham no IDE, além de analisadores de código e geradores de código, permitir que aplicações consumam seus serviços, facilitar a criação de mecanismos de script e REPL, facilitar a metaprogramação e a programação orientada a aspectos, fornecer uma API consistente para acesso fácil ao código. Com a abertura do código fonte, também houve a contribuição da comunidade em desenvolvê-lo melhor.

O compilador expõe a análise feita no código para o usuário como se fosse um serviço, mostrando em uma camada API que espelha o pipeline tradicional de um compilador.

Cada fase deste pipeline é separado em componentes distintos. A primeira fase  é aquela em que o código é separados em tokens e comparada à tabela de símbolos. A segunda fase é a análise das declarações e os metadados importados. A próxima fase é a análise dos identificadores que são comparados aos símbolos. A última fase é aquela em que toda a informação compilada é traduzida em Assembly.

Correspondendo a cada uma dessas fases um modelo do objeto é criado, o qual permite acesso às informações da determinada fase. 

A fase léxica é exposta em uma árvore sintática, a fase de declaração como uma tabela de símbolos hierárquica, a fase de ligação expõe o resultado da análise semântica do compilador e a fase de geração produz os bytecodes em uma API.


O Roslyn consiste em duas principais camadas de API, a do Compilador e do Workspace.

A camada de compilação contem os modelos de objeto que corresponde com a informação exposta em cada fase do pipeline do compilador, tanto sintático quanto semântico. Já a camada do Workspace contem a API do Workspace, o qual é o ponto de início para se fazer análise do códigoe a refatoração na solução inteira. Ajuda na organização de toda a informação sobre o projeto em uma solução dentro de um modelo simples de objeto.
