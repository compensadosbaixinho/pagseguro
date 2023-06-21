$(document).ready(function() {
  $('#valorVenda').mask('000.000,00', {reverse: true});
  $('input[type=radio][name=formaPagamento]').change(function() {
      if (this.value == 'credito') {
          $('#parcelasDiv').show();
          $('#parcelas').empty();
          for (let i = 1; i <= 18; i++) {
              $('#parcelas').append(new Option(`${i} ${i > 1 ? 'Parcelas' : 'Parcela'}`, i));
          }
      } else if (this.value == 'debito') {
          $('#parcelasDiv').hide();
          $('#parcelas').empty();
          $('#parcelas').append(new Option('1 Parcela', 1));
      }
  });
});

window.onload = function() {
  document.getElementById("btnCalcular").onclick = function() {
      var valorVenda = parseFloat(document.getElementById("valorVenda").value.replace(".", "").replace(",", "."));
      var formaPagamento = document.querySelector('input[name="formaPagamento"]:checked').value;
      var responsavelJuros = document.querySelector('input[name="responsavelJuros"]:checked').value;
      var parcelas = document.getElementById("parcelas").value;
      
      var valorTotal, valorDinheiro, valorMaterial;
      
      if (formaPagamento === "debito") {
          if (responsavelJuros === "marceneiro") {
              valorTotal = valorVenda * 0.9875;
              valorDinheiro = valorTotal * 0.70;
              valorMaterial = valorTotal * 0.30;
          } else if (responsavelJuros === "cliente") {
              valorTotal = valorVenda * 1.0127;
              valorDinheiro = valorVenda * 0.70; // original value
              valorMaterial = valorVenda * 0.30; // original value
          }
      } else if (formaPagamento === "credito") {
          if (responsavelJuros === "marceneiro") {
              var coeficientes = [0, 0.9721, 0.9501, 0.9416, 0.9331, 0.9247, 0.9164, 0.9082, 0.9001, 0.8922, 0.8843, 0.8764, 0.8687, 0.8611, 0.8535, 0.8461, 0.8387, 0.8314, 0.8242];
              valorTotal = valorVenda * coeficientes[parcelas];
              valorDinheiro = valorTotal * 0.70;
              valorMaterial = valorTotal * 0.30;
          } else if (responsavelJuros === "cliente") {
              var coeficientes = [0, 1.0287, 1.0525, 1.0620, 1.0717, 1.0814, 1.0912, 1.1011, 1.1110, 1.1208, 1.1308, 1.1410, 1.1511, 1.1613, 1.1716, 1.1819, 1.1923, 1.2028, 1.2133];
              valorTotal = valorVenda * coeficientes[parcelas];
              valorDinheiro = valorVenda * 0.70; // original value
              valorMaterial = valorVenda * 0.30; // original value
          }
      }

      // Apresentar o valor total com juros
      document.getElementById("valorTotal").innerHTML = "Valor final: R$" + valorTotal.toFixed(2).replace(".", ",");
        // Apresentar o valor em dinheiro
        document.getElementById("valorDinheiro").innerHTML = "70% em dinheiro: R$" + valorDinheiro.toFixed(2).replace(".", ",");
        // Apresentar o valor em material
        document.getElementById("valorMaterial").innerHTML = "30% em material: R$" + valorMaterial.toFixed(2).replace(".", ",");
    };
};

      