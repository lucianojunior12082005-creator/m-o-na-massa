# Mão na Massa — MVP Front-End

Portal de divulgação e captura de clientes para contratação de profissionais
autônomos de **limpeza, manutenção e pequenas obras**.

Projeto desenvolvido para a disciplina **Projeto de Desenvolvimento em Front-End**
(ADS — UNISUAM, 2026.1, Prof. Bruno Cezario).

> Projeto exclusivamente Front-End: toda persistência de dados é simulada com
> `localStorage`, sem back-end ou banco de dados.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis CSS, grid, flexbox, media queries)
- JavaScript puro (Vanilla JS)
- API pública [ViaCEP](https://viacep.com.br/) para preenchimento automático de endereço

## Estrutura de pastas

```
maonamassa/
├── index.html          # Landing page (catálogo + menu com submenus)
├── cadastro.html        # Cadastro de cliente (validações + CEP)
├── login.html            # Login (compara com localStorage)
├── dashboard.html       # Área restrita — perfil e resumo
├── orcamento.html        # Formulário de feedback/interesse (range, select, radio, checkbox)
├── confirmacao.html     # Exibição dos dados enviados no formulário
├── erro.html             # Página de erro personalizada (404 / falha de autenticação)
├── css/
│   └── style.css
├── js/
│   ├── main.js           # menu mobile, toasts, modal, acessibilidade, sessão
│   ├── cadastro.js        # validações do cadastro + integração ViaCEP
│   ├── login.js           # autenticação simulada
│   ├── orcamento.js       # formulário de solicitação de orçamento
│   └── confirmacao.js     # renderização do resumo enviado
└── assets/               # imagens e ícones
```

## Fluxos

**Público:** Landing Page → Cadastro → Login → Erro (404/401)
**Restrito (após login):** Dashboard → Solicitar orçamento → Confirmação

## Validações implementadas

- Nome completo: 15–80 caracteres, apenas letras
- CPF: cálculo real dos dígitos verificadores
- CEP: consulta à API ViaCEP com preenchimento automático de rua, bairro, cidade e UF
- Telefones: máscara `(+55)XX-XXXXXXXX`
- Login: exatamente 6 letras · Senha: exatamente 8 letras · Confirmação idêntica à senha
- Persistência do cadastro em `localStorage` como objeto JSON
- Login validado contra os dados salvos; nome do usuário mantido no topo entre as páginas internas

## Recursos de UX

- Nenhum uso de `window.alert()` — feedback via toasts e modal de confirmação
- Responsivo em Mobile (375px+), Tablet (768px+) e Desktop (1024px+)
- Menu fixo no topo com submenus e botão de logout na área restrita

## Desafio Plus — Acessibilidade

Barra de ferramentas com:
- Alternância entre tema claro e tema escuro (alto contraste)
- Botões A+ / A- para aumentar/diminuir a fonte do conteúdo, sem quebrar o layout

## Como rodar

Basta abrir `index.html` no navegador, ou publicar a pasta em GitHub Pages, Vercel ou Netlify.

## Integrantes

- Nome 1
- Nome 2
- Nome 3
- Nome 4
