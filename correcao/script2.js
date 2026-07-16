let carrinho = [];
document.addEventListener("DOMContentLoaded", () => {
  iniciarMenuMobile();
  iniciarPesquisa();
  iniciarScroll();
  iniciarBotaoTopo();
  iniciarScrollSuave();
  iniciarObserver();
  iniciarGaleria();
  iniciarRipple();
  iniciarCards();
  iniciarAdicionarCarrinho();
  iniciarCarrinho();
});

function iniciarMenuMobile() {
  const botao = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu-categorias");

  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    botao.classList.toggle("ativo");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !botao.contains(e.target)) {
      menu.classList.remove("ativo");
      botao.classList.remove("ativo");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("ativo");
      botao.classList.remove("ativo");
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("ativo");
      botao.classList.remove("ativo");
    });
  });
}

function iniciarPesquisa() {
  const campo = document.querySelector(".pesquisa input");

  const limpar = document.querySelector(".limpar-pesquisa");

  const caixa = document.querySelector(".resultado-pesquisa");

  const grid = document.querySelector(".resultado-grid");

  const produtos = document.querySelectorAll(".produto");

  if (!campo) return;

  campo.addEventListener("input", () => {
    const texto = campo.value.trim().toLowerCase();

    grid.innerHTML = "";

    if (texto === "") {
      limpar.style.display = "none";

      caixa.style.display = "none";

      return;
    }

    limpar.style.display = "block";

    let encontrou = false;

    produtos.forEach((produto) => {
      const nome = produto.querySelector("h3").textContent;

      const descricao = produto.querySelector("p").textContent;

      const categoria = produto.querySelector(".categoria-produto").textContent;

      const imagem = produto.querySelector("img").src;

      const preco = produto.querySelector("h4").textContent;

      const busca = (nome + " " + descricao + " " + categoria).toLowerCase();

      if (busca.includes(texto)) {
        encontrou = true;

        const card = document.createElement("div");

        card.className = "resultado-card";

        card.innerHTML = `

                    <img src="${imagem}">
                    <div class="resultado-info">
                      <h3>${nome}</h3>
                      <p>${descricao}</p>
                      <span class="resultado-preco">${preco}</span>
                  </div>
              `;

        card.onclick = () => {
          produto.scrollIntoView({
            behavior: "smooth",

            block: "center",
          });

          caixa.style.display = "none";
        };

        grid.appendChild(card);
      }
    });

    if (!encontrou) {
      grid.innerHTML = `<div class="sem-resultado">
            Nenhum produto encontrado.
            </div>`;
    }

    caixa.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".pesquisa").contains(e.target)) {
      caixa.style.display = "none";
    }
  });
  limpar.addEventListener("click", () => {
    campo.value = "";

    caixa.style.display = "none";

    limpar.style.display = "none";

    campo.focus();
  });
}

function iniciarScroll() {
  const header = document.querySelector("header");
  const btnTopo = document.querySelector(".btn-topo");
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".menu-categorias a");

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    if (header) {
      if (scroll > 70) {
        header.classList.add("header-scroll");
      } else {
        header.classList.remove("header-scroll");
      }
    }

    if (btnTopo) {
      if (scroll > 450) {
        btnTopo.classList.add("mostrar");
      } else {
        btnTopo.classList.remove("mostrar");
      }
    }

    let secaoAtual = "";

    secoes.forEach((secao) => {
      const topo = secao.offsetTop - 160;
      const altura = secao.offsetHeight;

      if (scroll >= topo && scroll < topo + altura) {
        secaoAtual = secao.id;
      }
    });

    links.forEach((link) => {
      link.classList.remove("ativo");

      const destino = link.getAttribute("href");

      if (destino === "#" + secaoAtual) {
        link.classList.add("ativo");
      }
    });
  });
}

function iniciarBotaoTopo() {
  const botao = document.querySelector(".btn-topo");

  if (!botao) return;

  botao.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function iniciarScrollSuave() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      const destino = document.querySelector(href);

      if (!destino) return;

      e.preventDefault();

      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

function iniciarObserver() {
  const elementos = document.querySelectorAll(`
        .produto,
        .categoria,
        .sobre-imagem,
        .sobre-texto,
        .avaliacao,
        .galeria-grid img,
        .titulo
    `);

  if (!elementos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aparecer");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elementos.forEach((item) => observer.observe(item));
}

function iniciarGaleria() {
  const imagens = document.querySelectorAll(".galeria-grid img");

  if (!imagens.length) return;

  imagens.forEach((imagem) => {
    imagem.addEventListener("click", () => {
      imagem.classList.toggle("zoom");
    });
  });
}

function iniciarRipple() {
  const botoes = document.querySelectorAll("button");

  if (!botoes.length) return;

  botoes.forEach((botao) => {
    botao.addEventListener("click", function (e) {
      const ripple = document.createElement("span");

      const tamanho = Math.max(this.clientWidth, this.clientHeight);

      ripple.style.width = tamanho + "px";
      ripple.style.height = tamanho + "px";

      const rect = this.getBoundingClientRect();

      ripple.style.left = e.clientX - rect.left - tamanho / 2 + "px";

      ripple.style.top = e.clientY - rect.top - tamanho / 2 + "px";

      ripple.classList.add("ripple");

      const antigo = this.querySelector(".ripple");

      if (antigo) {
        antigo.remove();
      }

      this.appendChild(ripple);
    });
  });
}

function iniciarCards() {
  const cards = document.querySelectorAll(".produto");

  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = ".35s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = ".35s";
    });
  });
}

function iniciarAdicionarCarrinho() {
  const botoes = document.querySelectorAll(".adicionar-carrinho");

  console.log("Botões encontrados:", botoes.length);

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      console.log("Clique!");

      const produto = botao.closest(".produto");

      const nome = produto.querySelector("h3").textContent;

      const preco = Number(produto.querySelector("h4").dataset.preco);

      const imagem = produto.querySelector("img").src;

      const existente = carrinho.find((item) => item.nome === nome);

      if (existente) {
        existente.quantidade++;
      } else {
        carrinho.push({
          nome,
          preco,
          imagem,
          quantidade: 1,
        });
      }

      console.log(carrinho);

      atualizarCarrinho();
    });
  });
}
function atualizarCarrinho() {
  const lista = document.querySelector(".carrinho-itens");
  const contador = document.querySelector(".contador-carrinho");
  const total = document.getElementById("total-carrinho");

  lista.innerHTML = "";

  let valorTotal = 0;
  let quantidadeTotal = 0;

  carrinho.forEach((item, index) => {
    valorTotal += item.preco * item.quantidade;
    quantidadeTotal += item.quantidade;

    lista.innerHTML += `
      <div class="item-carrinho">

        <img src="${item.imagem}" alt="${item.nome}">

        <div class="item-info">

          <h4>${item.nome}</h4>

          <p class="preco-item">
            R$ ${(item.preco * item.quantidade)
              .toFixed(2)
              .replace(".", ",")}
          </p>

          <div class="controle-quantidade">

            <button class="diminuir-item" data-id="${index}">
              <i class="bi bi-dash"></i>
            </button>

            <span>${item.quantidade}</span>

            <button class="aumentar-item" data-id="${index}">
              <i class="bi bi-plus"></i>
            </button>

          </div>

          <button class="remover-item" data-id="${index}">
            <i class="bi bi-trash3"></i>
            Remover
          </button>

        </div>

      </div>
    `;
  });

  contador.textContent = quantidadeTotal;
  total.textContent = valorTotal.toFixed(2).replace(".", ",");

  removerItens();
  aumentarItens();
  diminuirItens();
}
function removerItens() {
  document.querySelectorAll(".remover-item").forEach((botao) => {
    botao.onclick = () => {
      const id = botao.dataset.id;

      carrinho[id].quantidade--;

      if (carrinho[id].quantidade <= 0) {
        carrinho.splice(id, 1);
      }

      atualizarCarrinho();
    };
  });
}
function aumentarItens() {
  document.querySelectorAll(".aumentar-item").forEach((botao) => {
    botao.onclick = () => {
      const id = botao.dataset.id;

      carrinho[id].quantidade++;

      atualizarCarrinho();
    };
  });
}

function diminuirItens() {
  document.querySelectorAll(".diminuir-item").forEach((botao) => {
    botao.onclick = () => {
      const id = botao.dataset.id;

      carrinho[id].quantidade--;

      if (carrinho[id].quantidade <= 0) {
        carrinho.splice(id, 1);
      }

      atualizarCarrinho();
    };
  });
}

function iniciarCarrinho() {
  console.log("Carrinho iniciado");
  const btn = document.querySelector(".carrinho-btn");
  const painelCarrinho = document.querySelector(".carrinho");
  const overlay = document.querySelector(".overlay-carrinho");
  const fechar = document.querySelector(".fechar-carrinho");

  if (!btn || !painelCarrinho || !overlay || !fechar) return;

  btn.onclick = () => {
    painelCarrinho.classList.add("ativo");
    overlay.classList.add("ativo");
    atualizarCarrinho();
  };

  fechar.onclick = () => {
    painelCarrinho.classList.remove("ativo");
    overlay.classList.remove("ativo");
  };

  overlay.onclick = () => {
    painelCarrinho.classList.remove("ativo");
    overlay.classList.remove("ativo");
  };
  const finalizar = document.querySelector(".finalizar-whatsapp");

  finalizar.addEventListener("click", finalizarWhatsApp);
}

function finalizarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um produto ao carrinho.");
    return;
  }

  const nome = document.getElementById("nome-cliente").value.trim();
  const telefone = document.getElementById("telefone-cliente").value.trim();
  const tipoEntrega = document.getElementById("tipo-entrega").value;
  const endereco = document.getElementById("endereco-cliente").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const observacoes = document.getElementById("observacoes").value.trim();

  if (!nome || !telefone || !pagamento) {
    alert("Preencha todos os campos obrigatórios.");

    return;
  }

  if (tipoEntrega === "Entrega" && !endereco) {
    alert("Informe o endereço para entrega.");

    return;
  }

  let mensagem = `*NOVO PEDIDO*%0A%0A`;
  mensagem += `*Nome:* ${nome}%0A`;
  mensagem += `*Telefone:* ${telefone}%0A`;

  if (tipoEntrega === "Entrega") {
    mensagem += `*Endereço:* ${endereco}%0A%0A`;
  } else {
    mensagem += `*Retirada:* No local%0A%0A`;
  }
  mensagem += `*Entrega:* ${tipoEntrega}%0A`;
  mensagem += `*Endereço:* ${endereco}%0A%0A`;
  let total = 0;

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade;

    mensagem += `*${item.nome}*%0A`;
    mensagem += `Quantidade: ${item.quantidade}%0A`;
    mensagem += `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}%0A%0A`;

    total += subtotal;
  });

  mensagem += `*TOTAL:* R$ ${total.toFixed(2).replace(".", ",")}%0A`;
  mensagem += `*Pagamento:* ${pagamento}%0A`;

  if (observacoes !== "") {
    mensagem += `;*Observações:* ${observacoes}%0A`;
  }

  const numero = "5567998804811"; // COLOQUE AQUI O NÚMERO DA HAMBURGUERIA

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}