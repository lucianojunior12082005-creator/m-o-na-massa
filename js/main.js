/* ==========================================================================
   main.js — utilidades compartilhadas por todas as páginas
   Menu mobile, toasts, barra de acessibilidade e sessão do usuário
   ========================================================================== */

/* ---------- Toasts (substitui window.alert) ------------------------------ */
function mostrarToast(titulo, mensagem, tipo = "sucesso") {
  let area = document.querySelector(".area-toast");
  if (!area) {
    area = document.createElement("div");
    area.className = "area-toast";
    area.setAttribute("aria-live", "polite");
    document.body.appendChild(area);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (tipo === "erro" ? " erro" : "");
  toast.innerHTML = `<strong>${titulo}</strong>${mensagem}`;
  area.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("mostrar"));

  setTimeout(() => {
    toast.classList.remove("mostrar");
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

/* ---------- Modal de confirmação simples ---------------------------------- */
function confirmarAcao({ titulo, mensagem, textoConfirmar = "Confirmar", textoCancelar = "Cancelar" }) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "sobreposicao-modal";
    overlay.innerHTML = `
      <div class="caixa-modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
        <h3 id="titulo-modal">${titulo}</h3>
        <p>${mensagem}</p>
        <div class="acoes-modal">
          <button class="botao botao-secundario" data-acao="cancelar">${textoCancelar}</button>
          <button class="botao botao-primario" data-acao="confirmar">${textoConfirmar}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("mostrar"));

    overlay.addEventListener("click", (e) => {
      if (e.target.dataset.acao === "confirmar") { fechar(true); }
      if (e.target.dataset.acao === "cancelar" || e.target === overlay) { fechar(false); }
    });

    function fechar(resultado) {
      overlay.classList.remove("mostrar");
      setTimeout(() => overlay.remove(), 200);
      resolve(resultado);
    }
  });
}

/* ---------- Menu mobile e submenus ----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector(".alterna-menu-mobile");
  const menu = document.querySelector(".menu-principal");
  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
      const aberto = menu.classList.toggle("mostrar");
      botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

  document.querySelectorAll("li.tem-submenu > .link-menu").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 767) {
        e.preventDefault();
        link.parentElement.classList.toggle("aberto");
      }
    });
  });

  aplicarPreferenciasAcessibilidade();
  configurarBarraAcessibilidade();
  exibirSessaoNoTopo();
});

/* ---------- Acessibilidade: tema + escala de fonte -------------------------- */
function aplicarPreferenciasAcessibilidade() {
  const tema = localStorage.getItem("mnm_tema");
  const escala = localStorage.getItem("mnm_escala_fonte");
  if (tema === "escuro") document.body.classList.add("tema-escuro");
  if (escala) document.documentElement.style.setProperty("--fonte-escala", escala);
}

function configurarBarraAcessibilidade() {
  const botaoTema = document.querySelector("[data-a11y='tema']");
  const botaoMais = document.querySelector("[data-a11y='fonte-mais']");
  const botaoMenos = document.querySelector("[data-a11y='fonte-menos']");

  if (botaoTema) {
    const escuroAtivo = document.body.classList.contains("tema-escuro");
    botaoTema.setAttribute("aria-pressed", escuroAtivo ? "true" : "false");
    botaoTema.addEventListener("click", () => {
      const ativo = document.body.classList.toggle("tema-escuro");
      localStorage.setItem("mnm_tema", ativo ? "escuro" : "claro");
      botaoTema.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
  }

  let escala = parseFloat(localStorage.getItem("mnm_escala_fonte")) || 1;
  const limites = { min: 0.85, max: 1.35 };

  function atualizarEscala(nova) {
    escala = Math.min(limites.max, Math.max(limites.min, nova));
    document.documentElement.style.setProperty("--fonte-escala", escala.toFixed(2));
    localStorage.setItem("mnm_escala_fonte", escala.toFixed(2));
  }

  if (botaoMais) botaoMais.addEventListener("click", () => atualizarEscala(escala + 0.1));
  if (botaoMenos) botaoMenos.addEventListener("click", () => atualizarEscala(escala - 0.1));
}

/* ---------- Sessão do usuário ------------------------------------------------ */
function obterSessao() {
  const bruto = localStorage.getItem("mnm_sessao");
  return bruto ? JSON.parse(bruto) : null;
}

function exigirLogin() {
  const sessao = obterSessao();
  if (!sessao) {
    window.location.href = "erro.html?motivo=auth";
    return null;
  }
  return sessao;
}

function exibirSessaoNoTopo() {
  const alvo = document.querySelector("[data-sessao='nome']");
  const sessao = obterSessao();
  if (alvo && sessao) alvo.textContent = sessao.nome.split(" ")[0];

  const botaoLogout = document.querySelector("[data-acao='logout']");
  if (botaoLogout) {
    botaoLogout.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await confirmarAcao({
        titulo: "Sair da conta",
        mensagem: "Tem certeza de que deseja encerrar a sessão?",
        textoConfirmar: "Sair",
      });
      if (ok) {
        localStorage.removeItem("mnm_sessao");
        mostrarToast("Até logo!", "Você saiu da sua conta.");
        setTimeout(() => (window.location.href = "index.html"), 700);
      }
    });
  }
}
