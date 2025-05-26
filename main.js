document.addEventListener("DOMContentLoaded", async function () {
  // Container principal
  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  const containerPrincipal = document.createElement("div");
  containerPrincipal.id = "playlist-container";

  titleElement.insertAdjacentElement("afterend", containerPrincipal);

  const loading = document.createElement("div");
  loading.className = "loading-visible";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const loadingText = document.createElement("h3");
  loadingText.textContent = "Carregando Músicas...";

  loading.appendChild(spinner);
  loading.appendChild(loadingText);

  containerPrincipal.appendChild(loading);


  const sheet = 'https://docs.google.com/spreadsheets/d/1Xr3zBjYQYFV9ACutlksbecSY3T5fWnkQAHGoob5juLo/edit'
  const sheet2JsonUrl = 'https://api.sheets2json.com/v1/doc/?url='
  let musicasArray = []

  // TODO: get all tabs
  const tabs = [
    ['Entrada do noivo', 'entrada_noivo'],
    ['Entrada dos pais', 'entrada_pais'],
    ['Entrada da noiva', 'entrada_noiva'],
    ['Entrada das alianças', 'entrada_aliancas'],
    ['Entrada dos padrinhos', 'entrada_padrinhos'],
    ['Entrada de plaquinha ou florist', 'floristas'],
    ['comunhão', 'comunhao'],
    ['Beijo', 'beijo'],
    ['Assinaturas', 'assinatura'],
    ['Saida', 'saida'],
    ['Cumprimentos', 'cumprimentos'],
    ['Entrada da Biblia', 'entrada_biblia'],
    ['Salmo', 'salmo'],
    ['Santa Ceia', 'santa_ceia']
  ]
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i][0];
    const key = tabs[i][1]
    const musicas = await fetch(sheet2JsonUrl + `${sheet}&sheet=${tab}`).then(res => res.json())
    musicasArray = [...musicasArray, ...musicas.slice(1).map(m => [...m, key])]
  }

  // TODO: get imagem or generate random
  const musicas = musicasArray
    .map(m => ({ nome: m?.[0], momento: m?.[8], descricao: m?.[1], estilo: m?.[2], artista: m?.[4], video: m?.[5] || '', imagem: '' }))
    .filter((m) => m.nome && m.momento && m.descricao && m.estilo && m.artista)


  loading.className = "loading-invisible";

  // Filtros
  const filtroWrapper = document.createElement("div");
  filtroWrapper.className = "filtro-wrapper";

  const select = document.createElement("select");
  select.id = "filtro-estilo";
  select.className = "select-filtro";
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "Selecionar estilo";
  select.appendChild(opt);

  const estilosUnicos = [...new Set(musicas.map(m => m.estilo.toUpperCase()))];
  estilosUnicos.forEach(estilo => {
    const estiloSplited = estilo.split('/')
    estiloSplited.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.trim();
      opt.textContent = v.trim();
      select.appendChild(opt);
    })
  });

  const botaoFiltrar = document.createElement("button");
  botaoFiltrar.textContent = "Filtrar";
  botaoFiltrar.className = "botao-filtrar";

  const botaoReset = document.createElement("button");
  botaoReset.textContent = "Mostrar Tudo";
  botaoReset.className = "botao-reset";

  const searchTextContainer = document.createElement("div");
  searchTextContainer.className = "search-text-wrapper";

  const inputSearchText = document.createElement("input");
  inputSearchText.id = "input-search-text";
  inputSearchText.type = "text"
  inputSearchText.placeholder = "Pesquisar..."
  inputSearchText.className = "input-search-text";

  filtroWrapper.appendChild(inputSearchText);
  filtroWrapper.appendChild(select);
  filtroWrapper.appendChild(botaoFiltrar);
  filtroWrapper.appendChild(botaoReset);

  containerPrincipal.appendChild(searchTextContainer);

  select.addEventListener("change", (e) => {
    if (e.target.value) {
      select.style.color = '#F5BD50'
      select.style.fontWeight = 700;
      select.style.borderColor = '#F5BD50';
      botaoFiltrar.click()
    } else {
      select.style.color = '#475569'
      select.style.fontWeight = 400;
      select.style.borderColor = '#475569';
    }
  })

  inputSearchText.addEventListener("input", (e) => {
    if (select.selectedIndex) select.remove(select.selectedIndex);
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => el.className = '')
    const value = e.target.value;
    const filtradas = musicas.filter(m => m.nome.toLowerCase().includes(value.toLowerCase())
      || m.descricao.toLowerCase().includes(value.toLowerCase()));

    select.style.display = value ? 'none' : 'block'
    botaoReset.style.display = value ? 'none' : 'inline'
    momentDiv.className = value ? 'moment-musicas moment-musicas-disabled' : 'moment-musicas'
    select.style.color = '#475569'
    select.style.fontWeight = 400;
    select.style.borderColor = '#475569';
    renderizarMusicas(containerPrincipal, filtradas, listaMusicas);
  });

  containerPrincipal.appendChild(filtroWrapper);

  botaoFiltrar.addEventListener("click", () => {
    const otherElements = Array.from(momentDiv.children);
    const selected = otherElements?.find(el => Array.from(el.classList).some(el => el === 'selected'))?.id || ''
    inputSearchText.value = ""
    const estiloSelecionado = select.value;
    const filtradas = musicas.filter(m => m.estilo.toLowerCase().includes(estiloSelecionado.toLowerCase()) && m.momento.includes(selected));
    renderizarMusicas(containerPrincipal, filtradas, listaMusicas);
  });

  botaoReset.addEventListener("click", () => {
    if (select.selectedIndex) select.remove(select.selectedIndex);
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => el.className = '')
    inputSearchText.value = ""
    select.style.color = '#475569'
    select.style.fontWeight = 400;
    select.style.borderColor = '#475569';
    renderizarMusicas(containerPrincipal, musicas, listaMusicas);
  });

  // Container de Lista de Musicas e Momentos
  const container = document.createElement("div");
  container.className = "container-musicas";
  containerPrincipal.appendChild(container);

  // Lista de Musicas
  const listaMusicas = document.createElement("div");
  listaMusicas.id = "lista-musicas";
  listaMusicas.className = "lista-musicas";
  const listaMusicasContainer = document.createElement("div")
  listaMusicasContainer.className = "lista-musicas-container";
  listaMusicasContainer.appendChild(listaMusicas);
  container.appendChild(listaMusicasContainer);

  // Momentos
  const momentDiv = document.createElement("div");
  momentDiv.className = "moment-musicas";
  container.appendChild(momentDiv);

  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DO NOIVO", "entrada_noivo.png", "entrada_noivo")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DOS PAIS", "entrada_pais.png", "entrada_pais")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DA NOIVA", "entrada_noiva-scaled.jpg", "entrada_noiva")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DAS ALIANÇAS", "entrada_aliancas-scaled.jpg", "entrada_aliancas")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DOS PADRINHOS", "entrada_padrinhos-scaled.jpg", "entrada_padrinhos")
  criaBotaoMomento(botaoFiltrar, momentDiv, "FLORISTAS", "floristas-scaled.jpg", "floristas")
  criaBotaoMomento(botaoFiltrar, momentDiv, "COMUNHÃO", "comunhao-scaled.jpg", "comunhao")
  criaBotaoMomento(botaoFiltrar, momentDiv, "BEIJO", "beijo.jpg", "beijo")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ASSINATURA", "assinatura-scaled.jpg", "assinatura")
  criaBotaoMomento(botaoFiltrar, momentDiv, "SAÍDA", "saida-scaled.jpg", "saida")
  criaBotaoMomento(botaoFiltrar, momentDiv, "CUMPRIMENTOS", "cumprimentos.jpg", "cumprimentos")
  criaBotaoMomento(botaoFiltrar, momentDiv, "ENTRADA DA BÍBLIA", "entrada_biblia.jpg", "entrada_biblia")
  criaBotaoMomento(botaoFiltrar, momentDiv, "SALMO", "salmo.jpg", "salmo")
  criaBotaoMomento(botaoFiltrar, momentDiv, "SANTA CEIA", "santa_ceia-scaled.jpg", "santa_ceia")


  // TODO: Adicionar mais momentos

  renderizarMusicas(containerPrincipal, musicas, listaMusicas);
});

function renderizarMusicas(containerPrincipal, lista, listaMusicas, paginaAtual = 1, itensPorPagina = 12) {
  listaMusicas.innerHTML = "";

  if (!lista) return

  const totalPaginas = Math.ceil(lista.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaMusicas = lista?.slice(inicio, fim);


  paginaMusicas.forEach((musica) => {
    const item = document.createElement("div");
    const defaultMusicUrl = 'https://institutomusicaldanilomenezes.com/wp-content/uploads/2025/05/entrada_aliancas-scaled.jpg'
    item.className = "musica-card";

    item.innerHTML = `
      <img src="${musica.imagem || defaultMusicUrl}" alt="${musica.nome}">
      <div class="info">
        <h3>${musica.nome}</h3>
        <p>${musica.descricao.length > 75 ? (musica.descricao.substring(0, 75) + '...') : musica.descricao}</p>
        <p><strong>Tags:</strong> ${musica.artista}</p>
        <div class="botoes">
          <span class="estilo-tag">${musica.estilo}</span>
          ${musica?.video ? '<a href="' + musica.video + '" target="_blank">Assistir vídeo</a>' : ''}
        </div>
      </div>
    `;
    listaMusicas.appendChild(item);
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
      renderizarMusicas(containerPrincipal, lista, listaMusicas, i, itensPorPagina);
    });
    paginacao.appendChild(botao);
  }

  containerPrincipal.insertAdjacentElement("afterend", paginacao);
}

function criaBotaoMomento(botaoFiltrar, momentDiv, txt, img, id) {
  const el = document.createElement("div");
  const elImg = document.createElement("img");
  const elSpan = document.createElement("spam");
  elSpan.innerHTML = txt
  elImg.src = `https://institutomusicaldanilomenezes.com/wp-content/uploads/2025/05/${img}`
  el.id = id
  el.appendChild(elImg)
  el.appendChild(elSpan)
  momentDiv.appendChild(el);
  el.addEventListener("click", () => {
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => {
      if (el.id !== id) el.className = ''
    })
    if (Array.from(el.classList).some(el => el === 'selected')) {
      el.className = ''
    } else {
      el.className = 'selected'
    }
    botaoFiltrar.click();
  });
}