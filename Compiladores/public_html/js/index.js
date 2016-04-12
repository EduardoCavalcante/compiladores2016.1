function selectAnalyzer(event) {

    if (event && event.preventDefault) {
        event.preventDefault();
    }

    if (typeof event == 'object' && typeof event.target == 'object') {
        var form = event.target;
        if (typeof form.tagName == "string" && form.tagName == "FORM") {
            var analyzers = form.elements["analyzer"];

            if (analyzers.length > 0) {
                var withoutAnalyzers = true;
                    if (analyzers[0].checked && (!analyzers[1].checked && !analyzers[2].checked) ) {
                        if(lexicalAnalyzer){
                            analisadorLexico.initialize();
                        }
                        document.getElementById("analyserEmpty").className = "hidden";
                        document.getElementById("contentaAnalisadorLexico").className = "show";
                        withoutAnalyzers = false;
                    }

                    if (analyzers[1].checked && !analyzers[2].checked ) {
                        if(lexicalAnalyzer && syntacticAnalyzer){
                            analisadorLexico.initialize(analisadorSintatico);
                            
                            
                        }
                        document.getElementById("analyserEmpty").className = "hidden";
                        document.getElementById("contentaAnalisadorLexico").className = "show";
                        withoutAnalyzers = false;
                    }
                
                if (withoutAnalyzers) {
                    document.getElementById("analyserEmpty").className = "show";
                }
            }

        }
    }

}