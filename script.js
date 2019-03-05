window.onload = function(){
    //Variável para guardar o texto do arquvio lido
    let textoArquivo;
    let nomeArquivo;
     //Verificando se o browser suporta a API
     if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Setando a extensão para o arquivo
            var fileExtension = /vhd.*/;
            //Obtendo o objeto do arquivo
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            //Verficando se a extensão combina
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                //Inicialiando o objeto FileReader para ler ...
                var fileReader = new FileReader();
                fileReader.fileName = fileTobeRead.name
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('filecontents');
                    fileContents.innerText = fileReader.result;
                    textoArquivo = fileReader.result;
                    //console.log(textoArquivo)
                    //console.log(e.target.fileName);
                    nomeArquivo = e.target.fileName
                }
                //Renderizando no browser o arquivo lido
                fileReader.readAsText(fileTobeRead);
                //console.log(fileReader.fileName);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }

    //Implementar alteração do arquivo
    let valor
    let botao = document.getElementById('botao')
    botao.addEventListener('click', (e) => {
        console.log('clicou')
        valor = document.getElementById('valorAlterado').value
        console.log(valor)
        if(valor == null || valor == ''){
            alert('Primeiro digite um valor!')
        }else if(isNaN(valor)){
            alert('Apenas números são permitidos!')
            document.getElementById('valorAlterado').value = ''
        }else{
            criarArquivoeBaixar(valor, textoArquivo, nomeArquivo)
        }

    })
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function criarArquivoeBaixar(valor, textoArquivo, nomeArquivo){
    let novoTexto = textoArquivo.replace('lpm_cvalue => 80', 'lpm_cvalue => '+valor)
    novoTexto = novoTexto.replace('LPM_CVALUE NUMERIC "80"', 'LPM_CVALUE NUMERIC "'+valor+'"')
    console.log('Novo valor do arquivo')
    console.log(novoTexto)
    download(novoTexto, nomeArquivo+'.vhd', 'text/plain')
}