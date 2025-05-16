document.addEventListener("DOMContentLoaded", function () {
  // Listagem de musicas, TODO: Pegar da Planilha
  const musicas = [
    {
      nome: "Stand by Me",
      momento: "entrada_noivo",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Radio",
      momento: "entrada_noivo",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Born to Die",
      momento: "entrada_noiva",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "All with forever",
      momento: "entrada_noiva",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Running",
      momento: "entrada_noiva",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Phorograth",
      momento: "entrada_pais",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Algo parecido",
      momento: "entrada_pais",
      estilo: "Indie",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Céu azul",
      momento: "entrada_pais",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Never gonna be Alone",
      momento: "entrada_noivo",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Lost yourself",
      momento: "entrada_aliancas",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Love me and forever",
      momento: "entrada_aliancas",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Me amo",
      momento: "entrada_noiva",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    }
  ];

  // Container principal
  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  const containerPrincipal = document.createElement("div");
  containerPrincipal.id = "playlist-container";

  titleElement.insertAdjacentElement("afterend", containerPrincipal);

  // Filtros
  const filtroWrapper = document.createElement("div");
  filtroWrapper.className = "filtro-wrapper";

  const select = document.createElement("select");
  select.id = "filtro-estilo";
  select.className = "select-filtro";

  const estilosUnicos = [...new Set(musicas.map(m => m.estilo))];
  estilosUnicos.forEach(estilo => {
    const opt = document.createElement("option");
    opt.value = estilo;
    opt.textContent = estilo;
    select.appendChild(opt);
  });

  const botaoFiltrar = document.createElement("button");
  botaoFiltrar.textContent = "Filtrar";
  botaoFiltrar.className = "botao-filtrar";

  const botaoReset = document.createElement("button");
  botaoReset.textContent = "Todos";
  botaoReset.className = "botao-reset";

  filtroWrapper.appendChild(select);
  filtroWrapper.appendChild(botaoFiltrar);
  filtroWrapper.appendChild(botaoReset);
  containerPrincipal.appendChild(filtroWrapper);

  botaoFiltrar.addEventListener("click", () => {
    const estiloSelecionado = select.value;
    const filtradas = musicas.filter(m => m.estilo === estiloSelecionado);
    renderizarMusicas(containerPrincipal, filtradas, containerLista);
  });

  botaoReset.addEventListener("click", () => {
    renderizarMusicas(containerPrincipal, musicas, containerLista);
  });

  // Container de Lista de Musicas e Momentos
  const container = document.createElement("div");
  container.className = "container-musicas";
  containerPrincipal.appendChild(container);

  // Lista de Musicas
  const containerLista = document.createElement("div");
  containerLista.id = "lista-musicas";
  containerLista.className = "lista-musicas";
  container.appendChild(containerLista);

  // Momentos
  // TODO: Colocar as imagens da Jady
  const momentDiv = document.createElement("div");
  momentDiv.className = "moment-musicas";
  container.appendChild(momentDiv);

  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "ENTRADA DO NOIVO", "https://picsum.photos/100/100", "entrada_noivo")
  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "ENTRADA DOS PAIS", "https://picsum.photos/100/100", "entrada_pais")
  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "ENTRADA DA NOIVA", "https://picsum.photos/100/100", "entrada_noiva")
  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "ENTRADA DAS ALIANÇAS", "https://picsum.photos/100/100", "entrada_aliancas")
  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "ENTRADA DOS PADRINHOS", "https://picsum.photos/100/100", "entrada_padrinhos")
  criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, "FLORISTAS", "https://picsum.photos/100/100", "floristas")

  renderizarMusicas(containerPrincipal, musicas, containerLista);
});

function renderizarMusicas(containerPrincipal, lista, containerLista, paginaAtual = 1, itensPorPagina = 6) {
  containerLista.innerHTML = "";

  if(!lista) return

  const totalPaginas = Math.ceil(lista.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaMusicas = lista?.slice(inicio, fim);


  paginaMusicas.forEach((musica) => {
    const item = document.createElement("div");
    item.className = "musica-card";

    item.innerHTML = `
      <img src="${musica.imagem}" alt="${musica.nome}">
      <div class="info">
        <h3>${musica.nome}</h3>
        <p><strong>Estilo:</strong> ${musica.estilo}</p>
        <p><strong>Artista:</strong> ${musica.artista}</p>
        <div class="botoes">
          <span class="estilo-tag">${musica.estilo}</span>
          <a href="${musica.video}" target="_blank">Assistir vídeo</a>
        </div>
      </div>
    `;
    containerLista.appendChild(item);
  });

  // Paginação
  const paginacao = document.getElementById("paginacao") || document.createElement("div");
  paginacao.innerHTML = "";
  paginacao.className = "paginacao";
  paginacao.id = "paginacao";

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement("button");
    botao.textContent = i;
    botao.className = "botao-pagina";
    if (i === paginaAtual) {
      botao.classList.add("ativo");
    }
    botao.addEventListener("click", () => {
      renderizarMusicas(containerPrincipal, lista, containerLista, i, itensPorPagina);
    });
    paginacao.appendChild(botao);
  }

  containerPrincipal.insertAdjacentElement("afterend", paginacao);
}

function criaBotaoMomento(containerPrincipal, musicas, containerLista, momentDiv, txt, img, id) {
  const el = document.createElement("div");
  const elImg = document.createElement("img");
  const elSpan = document.createElement("spam");
  elSpan.innerHTML = txt
  elImg.src = img
  el.id = id
  el.appendChild(elImg)
  el.appendChild(elSpan)
  momentDiv.appendChild(el);
  el.addEventListener("click", () => {
    const filtradas = musicas.filter(m => m.momento === id);
    renderizarMusicas(containerPrincipal, filtradas, containerLista);
  });
}