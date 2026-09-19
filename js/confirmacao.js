/* ==========================================================================
   confirmacao.js — exibe os dados enviados no formulário de orçamento
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sessao = exigirLogin();
  if (!sessao) return;

  const pedido = JSON.parse(localStorage.getItem("mnm_pedido") || "null");
  const recibo = document.getElementById("recibo-pedido");

  if (!pedido) {
    recibo.innerHTML = "<p>Nenhuma solicitação encontrada. Que tal pedir um orçamento agora?</p>";
    return;
  }

  const nomesServico = {
    limpeza: "Limpeza residencial",
    manutencao: "Manutenção geral",
    obras: "Pequenas obras e reparos",
  };

  const data = new Date(pedido.enviadoEm).toLocaleString("pt-BR");

  recibo.innerHTML = `
    <dt>Cliente</dt><dd>${pedido.nomeCliente}</dd>
    <dt>Serviço solicitado</dt><dd>${nomesServico[pedido.tipoServico] || pedido.tipoServico}</dd>
    <dt>Nível de urgência</dt><dd>${pedido.urgenciaTexto}</dd>
    <dt>Período preferido</dt><dd>${pedido.periodo}</dd>
    <dt>Serviços extras</dt><dd>${pedido.extras.length ? pedido.extras.join(", ") : "Nenhum"}</dd>
    <dt>Detalhes</dt><dd>${pedido.detalhes || "—"}</dd>
    <dt>Enviado em</dt><dd>${data}</dd>
  `;
});
