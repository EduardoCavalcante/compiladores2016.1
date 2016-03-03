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
                for (var i = 0; i < analyzers.length; i++) {
                    var currentAnalyzer = analyzers[i];
                    if (currentAnalyzer.checked) {
                        if(lexicalAnalyzer){
                            analisadorLexico.initialize();
                        }
                        document.getElementById("analyserEmpty").className = "hidden";
                        withoutAnalyzers = false;
                    }
                }
                if (withoutAnalyzers) {
                    document.getElementById("analyserEmpty").className = "show";
                }
            }

        }
    }

}