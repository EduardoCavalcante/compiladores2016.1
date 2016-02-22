var file = {} || file;

file.lines = [];
file.reader = function () {
    if (FileReader)
    {
        if (window.File && window.FileReader && window.FileList && window.Blob) {

        } else {
            alert('The File APIs are not fully supported by your browser.');
        }
    }
};

file.splitLines = function (content) {
    file.lines = content.split("\n");
    console.log(file.lines);
    document.getElementById("formAnalyzers").className = "show";
    document.getElementById("analyserEmpty").className = "hidden";
};

file.readSingleFile = function (evt) {
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            file.splitLines(contents);

        };
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
};
file.write = function () {

};

var ready = window.onload;

window.onload = function () {
    document.getElementById('fileinput').addEventListener('change', file.readSingleFile, false);
};