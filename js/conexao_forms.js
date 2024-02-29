document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("enviar").addEventListener("click", function () {
        var nome = document.getElementById("nome").value;
        var telefone = document.getElementById("telefone").value;
        var local = document.getElementById("local").value;
        var mensagem = document.getElementById("mensagem").value;
        var destinatario = document.getElementById("setor").value;
        var linkWhatsapp = document.getElementById("setor").dataset.linkWhatsapp;

        if (nome && telefone && local) {
            if (destinatario) {
                    if(destinatario !== "hotelaria"){
                        enviarFormulario(nome, telefone, local, mensagem, destinatario);
                    } else{
                        if(linkWhatsapp){
                            window.open(linkWhatsapp);
                            Swal.fire({
                                icon: "success",
                                title: "Enviado",
                                text: "Ficamos felizes em poder ajuda-lo(a)!",
                                showConfirmButton: false,
                                footer: '<a href="/">OK</a>'
                            });
                        } else{
                            Swal.fire({
                                icon: "error",
                                title: "Error...",
                            });
                        }
                    }
                }
        } else {
            Swal.fire({
                icon: "error",
                title: "Por favor, preencha todos os campos obrigatórios.",
                showConfirmButton: false,
            });
        }
    });

    document.getElementById("setor").addEventListener("change", function () {
        var destinatario = this.value;
        // var destinatario = document.getElementById("setor").value;
        switch (this.value) {
            case "manutencao":
            case "ouvidoria":
                destinatario = "ti@socor.com.br";
                break;
            case "hotelaria":
                destinatario = "";
                break;
        }
        var setorSelecionado = this.value;
        if (setorSelecionado === "hotelaria") {
            mensagem.style.visibility = "hidden"; 
            mensagem.style.opacity = "0"; 
            mensagem.style.pointerEvents = "none"
        } else {
            mensagem.style.visibility = "visible"; 
            mensagem.style.opacity = "1"; 
            mensagem.style.pointerEvents = "auto";
        }
    });

    function enviarFormulario(nome, telefone, local, mensagem, destinatario) {
        fetch('http://localhost:3000/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, telefone: telefone, local: local, mensagem: mensagem, destinatario: destinatario })
        })
        .then(response => response.text())
        .then(result => {
            Swal.fire({
                icon: "success",
                title: "Enviado",
                text: "Ficamos felizes em poder ajuda-lo(a)!",
                showConfirmButton: false,
                footer: '<a href="/">OK</a>'
            });
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Erro ao enviar o seu feedback",
            });
        });
    }
});
