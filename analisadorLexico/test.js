<script>

  //Construindo uma tabela de símbolos: !!VE AI CDS SE DA PRA USAR ALGUMA COISA!
  var tabelaSimbolos = document.createElement("table");
  var cabecalho = document.createElement("thead");
  var corpo = document.createElement("tbody");
  
  tabelaSimbolos.appendChild(cabecalho);
  tabelaSimbolos.appendChild(corpo);
  
  //Construindo uma lista encadeada 2000 elementos
  // Criação da array especial com 2000 elementos
  var arrSpecial = new Array(2000);
  
  // Criar variáveis que possam ser passadas por referencia na função intervalChangeItter
  var arrInit = new Object();
  var arrFinal = new Object();
  
  // Preparar propriedade do objeto com valor inicial -1
  arrInit.referencia = -1;
  arrFinal.referencia = -1;
  
  // Colocar números a serem passados
  intervalChangeItter(arrSpecial, 3, arrInit, arrFinal);
  intervalChangeItter(arrSpecial, 7, arrInit, arrFinal);
  intervalChangeItter(arrSpecial, 9, arrInit, arrFinal);
  intervalChangeItter(arrSpecial, 10, arrInit, arrFinal);
  
  // Executar o loop lista encadeada
  document.write("Usando Lista Encadeada:<br/>")
  for(var i = arrInit.referencia ; i != undefined; i = arrSpecial[i ]) {
   document.write(i + "<br/>")
  }
  
  // Executar o for each
  i = 0;
  document.write("Usando Foreach:<br/>")
  for(var i in arrSpecial) {
   document.write(arrSpecial[i ] + "<br/>")
  }
  
  // Executar o for COMUM
  i = 0;
  document.write("Usando FOR comum:<br/>")
  for(i = 0; i < arrSpecial.length; i++) {
   document.write(arrSpecial[i ] + "<br/>")
  }
  
  // Funcao
  function intervalChangeItter(array, valor, inicio, ultimoNumeroVar) {
  
   if (array[valor] != undefined || valor == undefined) 
    return false;
  
   if (inicio.referencia == -1) {
    inicio.referencia = valor;
    return true;
   }
  
   if (valor < inicio.referencia) {
    array[valor] = inicio.referencia;
    return inicio.referencia = valor, true;
   }
  
   if (array[inicio.referencia] == undefined) {
    array[inicio.referencia] = valor
    ultimoNumeroVar.referencia = valor
    return true;
   }
  
   array[ultimoNumeroVar.referencia] = valor
   ultimoNumeroVar.referencia = valor
  
   return true;

   //teste de mudanca
  }
</script>
