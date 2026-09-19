/* ==========================================================================
   orcamento.js — formulário de solicitação de orçamento (área restrita)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sessao = exigirLogin();
  if (!sessao) return;

  const form = document.getElementById("form-orcamento");
  if (!form) return;

  const urgencia = document.getElementById("urgencia");
  const valorUrgencia = document.getElementById("valor-urgencia");
  const rotulos = ["Sem pressa", "Esta semana", "Nos próximos 2 dias", "Hoje", "Agora — é urgente"];

  urgencia.addEventListener("input", () => {
    valorUrgencia.textContent = rotulos[urgencia.value - 1];
  });
  valorUrgencia.textContent = rotulos[urgencia.value - 1];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tipoServico = document.getElementById("tipo-servico").value;
    const periodo = form.querySelector('input[name="periodo"]:checked');

    if (!tipoServico) {
      mostrarToast("Falta uma informação", "Selecione o tipo de serviço desejado.", "erro");
      return;
    }
    if (!periodo) {
      mostrarToast("Falta uma informação", "Escolha o período de preferência.", "erro");
      return;
    }

    const extras = Array.from(form.querySelectorAll('input[name="extra"]:checked')).map((c) => c.value);

    const pedido = {
      nomeCliente: sessao.nome,
      tipoServico,
      urgencia: Number(urgencia.value),
      urgenciaTexto: rotulos[urgencia.value - 1],
      periodo: periodo.value,
      extras,
      detalhes: document.getElementById("detalhes").value.trim(),
      enviadoEm: new Date().toISOString(),
    };

    localStorage.setItem("mnm_pedido", JSON.stringify(pedido));
    mostrarToast("Solicitação enviada", "Já vamos te mostrar o resumo do pedido.");
    setTimeout(() => (window.location.href = "confirmacao.html"), 700);
  });
});
