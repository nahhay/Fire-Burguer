/*==========================
    MENU MOBILE
==========================*/

const menuButton = document.querySelector(".menu-mobile");
const menuCategorias = document.querySelector(".menu-categorias");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    menuCategorias.classList.toggle("ativo");
  });
}

/*==========================
    PESQUISA
==========================*/

const pesquisa = document.querySelector(".pesquisa input");
const produtos = document.querySelectorAll(".produto");

if (pesquisa) {
  pesquisa.addEventListener("keyup", () => {

    const valor = pesquisa.value.toLowerCase();

    produtos.forEach(produto => {

      const nome = produto.querySelector("h3").textContent.toLowerCase();

      if (nome.includes(valor)) {
        produto.style.display = "block";
      } else {
        produto.style.display = "none";
      }

    });

  });
}

/*==========================
    HEADER MENOR
==========================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }

});

/*==========================
    BOTÃO TOPO
==========================*/

const topo = document.querySelector(".btn-topo");

if (topo) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
      topo.classList.add("mostrar");
    } else {
      topo.classList.remove("mostrar");
    }

  });

}

/*==========================
    LINKS DAS CATEGORIAS
==========================*/

const links = document.querySelectorAll(".menu-categorias a");

links.forEach(link => {

  link.addEventListener("click", () => {

    links.forEach(item => item.classList.remove("ativo"));

    link.classList.add("ativo");

  });

});

/*==========================
    ANIMAÇÃO AO APARECER
==========================*/

const elementos = document.querySelectorAll(
  ".produto, .avaliacao, .info-card, .sobre, .galeria img"
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("aparecer");

    }

  });

}, {
  threshold: .15
});

elementos.forEach(item => observer.observe(item));

/*==========================
    SCROLL SUAVE
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function(e){

    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));

    if(destino){

      destino.scrollIntoView({

        behavior:"smooth"

      });

    }

  });

});