Flowbite-Svelte v0.48.6: O Guia Completo do Desenvolvedor para Svelte 4Parte I: Fundamentos e ConfiguraçãoEsta primeira parte estabelece o conhecimento fundamental necessário para iniciar qualquer projeto com o Flowbite-Svelte v0.48.6, focando no processo de configuração crítico e específico da versão.Capítulo 1: Introdução ao Flowbite-Svelte v0.48.6Compreendendo o Ecossistema FlowbiteFlowbite é uma biblioteca de componentes de UI de código aberto construída sobre o framework de CSS utilitário, Tailwind CSS. Ela oferece uma vasta coleção de elementos, desde componentes simples como botões e badges até elementos interativos complexos como modais, dropdowns e seletores de data (datepickers).1 O objetivo principal é acelerar o desenvolvimento de interfaces web modernas, fornecendo blocos de construção prontos para uso.Flowbite-Svelte é a implementação oficial e nativa de Svelte do ecossistema Flowbite. Uma distinção crucial é que, nesta biblioteca, toda a interatividade dos componentes é gerenciada pelo próprio Svelte, utilizando seus mecanismos reativos e de ciclo de vida. Isso contrasta com a versão de JavaScript puro do Flowbite, que depende de um arquivo JavaScript separado e atributos de dados para manipular o DOM.1 A abordagem nativa do Svelte resulta em pacotes de produção (bundles) menores, melhor desempenho e uma integração mais coesa com a lógica da aplicação Svelte. A biblioteca é distribuída sob a licença MIT, o que permite seu uso irrestrito em projetos pessoais e comerciais, além de incentivar a contribuição da comunidade.1Por que a Versão 0.48.6? O Contexto do Svelte 4A escolha da versão v0.48.6 é deliberada e de extrema importância para desenvolvedores que trabalham com o Svelte 4. Esta é a última versão do flowbite-svelte que oferece suporte oficial e estável para o Svelte 4 [User Query].Versões subsequentes da biblioteca foram reescritas para tirar proveito do Svelte 5 e seu novo sistema de reatividade baseado em "runes".5 O Svelte 5 introduziu mudanças significativas e quebras de compatibilidade, como a substituição de declarações reativas com $ por let count = $state(0) e a sintaxe de {#snippet...} para slots.6 Consequentemente, tentar usar versões mais recentes do flowbite-svelte em um projeto Svelte 4 resultará em erros de compilação, como Component.render(...) is no longer valid, pois a API interna dos componentes mudou fundamentalmente.7Portanto, para qualquer projeto que pretenda permanecer no ecossistema Svelte 4, seja por requisitos de estabilidade, dependências legadas ou para evitar uma migração complexa, a versão v0.48.6 representa a escolha canônica e robusta. Este guia foca exclusivamente em seu uso no ambiente suportado do Svelte 4.Princípios Fundamentais: Interatividade Nativa do Svelte com Tailwind CSSA filosofia central do Flowbite-Svelte é a combinação de dois paradigmas poderosos: a reatividade compilada do Svelte e a estilização utilitária do Tailwind CSS.1Interatividade Nativa do Svelte: Todos os estados internos, eventos e lógicas de componentes são escritos em Svelte. Por exemplo, a visibilidade de um modal é controlada por uma variável Svelte, e não por manipulação direta de classes CSS via JavaScript externo.Estilização com Tailwind CSS: A aparência de cada componente é definida por classes de utilidade do Tailwind CSS. Isso oferece aos desenvolvedores uma flexibilidade de personalização sem precedentes, permitindo que modifiquem cores, espaçamentos, tamanhos e outros aspectos visuais diretamente na marcação do componente, aderindo à abordagem "utility-first" do Tailwind.1Essa sinergia permite um desenvolvimento rápido e um alto grau de customização, mantendo o código limpo e declarativo.Capítulo 2: Instalação e Configuração do ProjetoEste capítulo fornece um guia de configuração passo a passo, definitivo e testado para a versão v0.48.6. Seguir estas instruções precisamente é crucial para evitar problemas comuns de configuração.Passo 1: Configurando um Projeto SvelteKit para Svelte 4Para iniciar um novo projeto, utilize a interface de linha de comando (CLI) do SvelteKit. Embora as versões mais recentes do create-svelte possam favorecer o Svelte 5, é possível garantir a compatibilidade com o Svelte 4 gerenciando as dependências.Execute o comando de criação do projeto 9:Bashnpm create svelte@latest meu-projeto-flowbite
Durante o processo de instalação, selecione "Skeleton project" para um início limpo. Após a criação, navegue até o diretório do projeto e abra o arquivo package.json. Verifique se as dependências do Svelte e do SvelteKit estão fixadas na versão 4. Se necessário, ajuste-as:JSON"devDependencies": {
  "@sveltejs/adapter-auto": "^2.0.0", // ou outro adaptador
  "@sveltejs/kit": "^1.20.4", // Versão compatível com Svelte 4
  "svelte": "^4.2.7",
  "vite": "^4.4.2"
  //... outras dependências
}
Em seguida, instale as dependências:Bashcd meu-projeto-flowbite
npm install
Passo 2: Instalando e Configurando o Tailwind CSS v3A maneira mais confiável de adicionar o Tailwind CSS a um projeto SvelteKit é usando o svelte-add. Este comando automatiza a criação dos arquivos de configuração e a configuração das importações necessárias.9Bashnpx svelte-add@latest tailwindcss
npm install
Isso criará os arquivos tailwind.config.cjs e postcss.config.js na raiz do seu projeto e adicionará as diretivas do Tailwind ao seu CSS.Passo 3: Instalando o Flowbite-Svelte v0.48.6 e DependênciasInstale a versão exata do flowbite-svelte junto com suas dependências de pares (peer dependencies). É fundamental incluir flowbite (para o plugin do Tailwind), tailwind-merge (para a sobreposição de classes) e @popperjs/core (para o posicionamento de elementos flutuantes como dropdowns e tooltips).9Bashnpm install -D flowbite-svelte@0.48.6 flowbite tailwind-merge @popperjs/core
Usar npm ou pnpm é uma questão de preferência, mas os comandos são análogos.Passo 4: O tailwind.config.cjs Definitivo para a v0.48.6Este é o passo mais crítico e a principal fonte de erros para os desenvolvedores. A documentação online mais recente do Flowbite-Svelte reflete configurações para o Tailwind v4, que são incompatíveis com esta versão. A configuração correta para a v0.48.6 é feita inteiramente através do arquivo tailwind.config.cjs.Abra o arquivo tailwind.config.cjs e substitua seu conteúdo pelo seguinte código anotado:JavaScript/** @type {import('tailwindcss').Config} */
export default {
  // 1. Array de Conteúdo (Content Array):
  // Essencial para que o compilador JIT do Tailwind encontre e gere as classes
  // CSS usadas tanto no seu código-fonte (`src`) quanto dentro da biblioteca
  // `flowbite-svelte` em `node_modules`. Sem a segunda linha, os componentes
  // do Flowbite não serão estilizados. [9, 10, 11]
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],

  // 2. Plugins:
  // Adiciona o plugin do Flowbite, que fornece estilos base para elementos
  // como formulários e garante a funcionalidade de variantes como `dark:`. [9, 10]
  plugins: [require('flowbite/plugin')],

  // 3. Extensão do Tema (Theme Extension):
  // Muitos componentes do Flowbite-Svelte usam uma paleta de cores 'primary'
  // por padrão. É crucial definir essa paleta para evitar que os componentes
  // pareçam sem cor ou quebrados. [9, 10]
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B',
        },
      },
    },
  },
};
Aviso Importante: Documentações mais recentes podem sugerir o uso de diretivas como @plugin 'flowbite/plugin' dentro do seu arquivo CSS. Essa sintaxe é para o Tailwind v4 e não funcionará com a configuração necessária para o flowbite-svelte@0.48.6. A configuração deve ser feita exclusivamente via tailwind.config.cjs.Passo 5: Layout Raiz e Estratégia de Importação de CSSO processo svelte-add geralmente cria um arquivo src/app.css e o importa no seu layout raiz. Verifique se o conteúdo de src/app.css contém as três diretivas principais do Tailwind:CSS@tailwind base;
@tailwind components;
@tailwind utilities;
Em seguida, certifique-se de que este arquivo CSS está sendo importado no seu arquivo de layout raiz, src/routes/+layout.svelte 10:Svelte<script>
  import '../app.css';
</script>

<slot />
Passo 6: Instalando e Usando flowbite-svelte-iconsEmbora opcional, a biblioteca de ícones é altamente recomendada, pois muitos exemplos na documentação oficial a utilizam. A instalação garante que os exemplos de código funcionem como esperado.4Bashnpm install -D flowbite-svelte-icons
Agora, você pode importar ícones diretamente em seus componentes Svelte, como <InfoCircleSolid />.Com esses passos, seu ambiente de desenvolvimento está corretamente configurado para construir interfaces com o flowbite-svelte@0.48.6 e Svelte 4.Parte II: A Referência de ComponentesEsta parte serve como o núcleo da documentação, fornecendo uma referência exaustiva para cada componente principal. Cada capítulo segue uma estrutura consistente para facilitar a consulta.Estrutura de Referência do ComponenteIntrodução: Descrição do propósito do componente.Configuração: Declarações de importação necessárias.Uso e Exemplos: Snippets de código para implementação padrão e variações.API do Componente: Tabelas detalhadas para Props, Slots e Events.Notas Avançadas: Dicas específicas, considerações de acessibilidade ou padrões de uso avançado.Capítulo 3: Layout e NavegaçãoComponentes estruturais que formam o esqueleto de qualquer aplicação web.NavbarO componente Navbar e seus subcomponentes (NavBrand, NavUl, NavLi, NavHamburger) são usados para construir barras de navegação responsivas.Configuração:Svelte<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
</script>
Exemplo Básico:Svelte<Navbar>
  <NavBrand href="/">
    <img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Minha App</span>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/sobre">Sobre</NavLi>
    <NavLi href="/contato">Contato</NavLi>
  </NavUl>
</Navbar>
API do Componente: NavbarPropTipoPadrãoDescriçãoclassstring''Classes CSS para aplicar ao elemento <nav> principal.colorstring'default'Define a cor de fundo da navbar. Opções incluem default, primary, red, etc., ou none.fluidbooleanfalseSe true, a navbar ocupará a largura total da página em vez de ser contida.API do Componente: NavUlPropTipoPadrãoDescriçãoactiveUrlstring''A URL da página atual. O NavLi correspondente será estilizado como ativo.15ulClassstring''Classes CSS para aplicar ao elemento <ul>.hiddenbooleantrueControla a visibilidade do menu em telas pequenas. Geralmente vinculado ao estado do NavHamburger.API do Componente: NavLiPropTipoPadrãoDescriçãohrefstring''O destino do link de navegação.16activebooleanfalseDefine manualmente se o link está ativo. É sobrescrito pela lógica do activeUrl se presente no NavUl.activeClassstringundefinedClasses CSS para aplicar quando o item está ativo.16nonActiveClassstringundefinedClasses CSS para aplicar quando o item está inativo.16Notas Avançadas:Para destacar o link ativo dinamicamente em um projeto SvelteKit, use o store $page para alimentar a prop activeUrl.Svelte<script>
  import { page } from '$app/stores';
  //... imports da navbar
</script>

<Navbar>
  <NavUl activeUrl={$page.url.pathname}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/sobre">Sobre</NavLi>
  </NavUl>
</Navbar>
SidebarO componente Sidebar é ideal para menus de navegação laterais, comuns em dashboards e painéis de administração. Ele suporta itens aninhados para criar menus de múltiplos níveis.17Configuração:Svelte<script>
  import { Sidebar, SidebarGroup, SidebarItem, SidebarDropdownWrapper, SidebarDropdownItem } from "flowbite-svelte";
  import { ChartOutline, MailBoxSolid, UserSolid } from "flowbite-svelte-icons";
</script>
Exemplo com Múltiplos Níveis:Svelte<Sidebar>
  <SidebarGroup>
    <SidebarItem label="Dashboard" href="/dashboard">
      <svelte:fragment slot="icon"><ChartOutline class="w-6 h-6" /></svelte:fragment>
    </SidebarItem>
    <SidebarDropdownWrapper label="E-commerce">
      <svelte:fragment slot="icon"><MailBoxSolid class="w-6 h-6" /></svelte:fragment>
      <SidebarDropdownItem label="Produtos" href="/ecommerce/produtos" />
      <SidebarDropdownItem label="Faturamento" href="/ecommerce/faturamento" />
    </SidebarDropdownWrapper>
    <SidebarItem label="Usuários" href="/usuarios">
      <svelte:fragment slot="icon"><UserSolid class="w-6 h-6" /></svelte:fragment>
    </SidebarItem>
  </SidebarGroup>
</Sidebar>
API do Componente: SidebarPropTipoPadrãoDescriçãoactiveUrlstring''A URL da página atual para destacar o SidebarItem ativo.17activeClassstring...Classes CSS para o item ativo.nonActiveClassstring...Classes CSS para itens inativos.Slots do Componente: SidebarItemSlotDescriçãoiconEspaço para renderizar um componente de ícone.CardO Card é um contêiner versátil para agrupar conteúdo relacionado, como uma postagem de blog, um perfil de usuário ou um produto.Configuração:Svelte<script>
  import { Card } from "flowbite-svelte";
</script>
Exemplo com Imagem e Link:Svelte<Card href="/artigo/1" img="/caminho/para/imagem.webp">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Título do Artigo
  </h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
    Aqui vai um breve resumo do conteúdo do artigo...
  </p>
</Card>
API do Componente: CardPropTipoPadrãoDescriçãohrefstringundefinedSe fornecido, o card inteiro se torna um link (<a>) para esta URL.19imgstringundefinedURL da imagem a ser exibida no topo (ou na lateral) do card.19horizontalbooleanfalseSe true, o card adota um layout horizontal com a imagem à esquerda e o conteúdo à direita.19reversebooleanfalseSe true, inverte a ordem da imagem e do conteúdo (imagem abaixo no layout vertical, ou à direita no horizontal).19size'xs' | 'sm' | 'md' | 'lg' | 'xl''sm'Define a largura máxima do card (max-w-*).19padding'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl''lg'Define o preenchimento (padding) interno do card.19Slots do Componente: CardSlotDescriçãodefaultO conteúdo principal do card. Se a prop img for usada, este slot é envolvido por uma div com o padding apropriado.19Capítulo 4: Componentes Interativos e de SobreposiçãoEstes componentes gerenciam interações do usuário, como diálogos, menus e conteúdo expansível.ModalO componente Modal é usado para exibir diálogos e notificações que se sobrepõem ao conteúdo principal.Configuração:Svelte<script>
  import { Button, Modal } from "flowbite-svelte";
</script>
Exemplo de Uso:O controle da visibilidade do modal é feito através da diretiva bind:open.Svelte<script>
  let showModal = false;
</script>

<Button on:click={() => showModal = true}>Abrir Modal</Button>

<Modal title="Termos de Serviço" bind:open={showModal} autoclose>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Conteúdo do modal aqui...
  </p>
  <svelte:fragment slot="footer">
    <Button on:click={() => showModal = false}>Aceito</Button>
    <Button color="alternative" on:click={() => showModal = false}>Recusar</Button>
  </svelte:fragment>
</Modal>
API do Componente: ModalPropTipoPadrãoDescriçãoopenbooleanfalseControla a visibilidade do modal. Use bind:open para controle bidirecional.20titlestring''O texto do título exibido no cabeçalho do modal.20size'xs' | 'sm' |... | '7xl''md'Define o tamanho (largura máxima) do modal.20autoclosebooleanfalseSe true, qualquer botão dentro do modal o fechará ao ser clicado.21outsideclosebooleantrueSe true, clicar no backdrop (fundo) fecha o modal.21permanentbooleanfalseSe true, desabilita todas as formas de fechar o modal (ESC, clique externo, botões).21backdropClassstring''Classes CSS para estilizar o elemento de fundo (backdrop).21Slots do Componente: ModalSlotDescriçãodefaultO conteúdo principal (corpo) do modal.headerPermite substituir todo o cabeçalho do modal por conteúdo personalizado.21footerPermite adicionar um rodapé personalizado, ideal para botões de ação.21Eventos do Componente: ModalEventoPayloadDescriçãocloseeventDisparado quando o modal é fechado (por qualquer meio).canceleventDisparado quando o modal é fechado pela tecla ESC.onclosefunctionUma prop de callback que é executada quando o modal fecha.21Notas Avançadas:Para interações mais complexas, como chamar uma função exportada de dentro do modal, pode-se obter uma referência à instância do componente usando bind:this.21AccordionOs componentes Accordion e AccordionItem criam seções de conteúdo que podem ser expandidas e recolhidas.Configuração:Svelte<script>
  import { Accordion, AccordionItem } from "flowbite-svelte";
</script>
Exemplo de Uso:Svelte<Accordion>
  <AccordionItem>
    <span slot="header">O que é Flowbite-Svelte?</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">
      É uma biblioteca de componentes de UI para Svelte que usa Tailwind CSS.
    </p>
  </AccordionItem>
  <AccordionItem>
    <span slot="header">É de código aberto?</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">
      Sim, é licenciado sob a licença MIT.
    </p>
  </AccordionItem>
</Accordion>
API do Componente: AccordionPropTipoPadrãoDescriçãomultiplebooleanfalseSe true, permite que vários AccordionItem estejam abertos simultaneamente.24flushbooleanfalseRemove as bordas arredondadas e algumas sombras para um visual mais integrado.24activeClassstring...Classes CSS para o cabeçalho do item ativo. Pode ser herdado pelos filhos.25inactiveClassstring...Classes CSS para o cabeçalho do item inativo. Pode ser herdado pelos filhos.25API do Componente: AccordionItemPropTipoPadrãoDescriçãoopenbooleanfalseControla programaticamente se o item está aberto. Use bind:open.Slots do Componente: AccordionItemSlotDescriçãodefaultO conteúdo do corpo do item do accordion.headerO conteúdo do cabeçalho clicável do item.26Capítulo 5: Elementos de Formulário e EntradasUma coleção abrangente de componentes para coletar dados do usuário.Input, Label e HelperOs blocos de construção fundamentais para qualquer formulário.Configuração:Svelte<script>
  import { Input, Label, Helper } from "flowbite-svelte";
</script>
Exemplo com Validação:Svelte<script>
  let email = '';
  let error = 'O e-mail é obrigatório.';
</script>

<div>
  <Label for="email-input" color={error? 'red' : 'green'} class="mb-2">Seu E-mail</Label>
  <Input id="email-input" type="email" bind:value={email} color={error? 'red' : 'green'} placeholder="nome@exemplo.com" />
  {#if error}
    <Helper color="red" class="mt-2">{error}</Helper>
  {/if}
</div>
API do Componente: InputPropTipoPadrãoDescriçãotypestring'text'O tipo do input (text, email, password, number, etc.).27valueanyundefinedO valor do input. Use bind:value para reatividade.27size'sm' | 'md' | 'lg''md'Define o tamanho do campo de entrada.27color'base' | 'green' | 'red''base'Define a cor da borda, útil para estados de validação (sucesso/erro).27clearablebooleanfalseSe true, exibe um botão para limpar o conteúdo do input.29disabledbooleanfalseDesabilita o campo de entrada.28Slots do Componente: InputSlotDescriçãoleftEspaço para renderizar um ícone ou addon no lado esquerdo, dentro da borda do input.28rightEspaço para renderizar um ícone ou addon no lado direito, dentro da borda do input.Eventos do Componente: InputO componente Input encaminha eventos DOM padrão, como on:input, on:change, on:blur, on:focus, e on:keydown.27Capítulo 6: Exibição de DadosComponentes projetados para apresentar conjuntos de dados de forma estruturada e visualmente agradável.TableO Flowbite-Svelte oferece um conjunto de componentes para criar tabelas de dados (Table, TableHead, TableBody, TableBodyRow, TableBodyCell, etc.).Configuração:Svelte<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
</script>
Exemplo com Dados Dinâmicos (Padrão Recomendado):A abordagem mais robusta e reativa para tabelas com dados dinâmicos é usar um bloco Svelte #each em vez da prop items. Um problema conhecido nesta versão da biblioteca é que a prop items não reage adequadamente a mudanças em Svelte stores.30 O uso de #each contorna esse problema e oferece controle total sobre a renderização.Svelte<script>
  import { writable } from 'svelte/store';

  // Suponha que `userStore` é um store Svelte
  const userStore = writable();
</script>

<Table hoverable={true}>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Nome</TableHeadCell>
    <TableHeadCell>Email</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each $userStore as user (user.id)}
      <TableBodyRow>
        <TableBodyCell>{user.id}</TableBodyCell>
        <TableBodyCell>{user.name}</TableBodyCell>
        <TableBodyCell>{user.email}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
API do Componente: TablePropTipoPadrãoDescriçãostripedbooleanfalseSe true, aplica um fundo alternado (zebrado) às linhas da tabela.31hoverablebooleanfalseSe true, adiciona um efeito de hover às linhas da tabela.31divClassstring''Classes para aplicar ao div wrapper que permite o overflow horizontal.Notas Avançadas:A não reatividade da prop items é um ponto crítico. Ao tentar passar um store diretamente (<Table items={$myStore}>), as atualizações no store (como adicionar ou remover itens) não serão refletidas na UI da tabela.30 A causa provável é que a lógica interna do componente na v0.48.6 não se inscreve corretamente nas mudanças do store. Portanto, a prática recomendada é sempre iterar sobre os dados com um bloco #each dentro do TableBody, como demonstrado no exemplo. Isso garante que a reatividade do Svelte funcione como esperado.Capítulo 7: Componentes Utilitários e AuxiliaresElementos que fornecem funcionalidade e feedback visual em diversas partes de uma aplicação.ButtonO componente Button é um dos mais versáteis, com suporte para múltiplos estilos, cores e tamanhos.Configuração:Svelte<script>
  import { Button } from "flowbite-svelte";
  import { CartSolid } from "flowbite-svelte-icons";
</script>
Exemplos de Variações:Svelte<Button color="primary">Salvar</Button>

<Button outline color="green">Cancelar</Button>

<Button pill={true}>Pill</Button>

<Button>
  <CartSolid class="me-2 h-5 w-5" /> Adicionar ao Carrinho
</Button>

<Button size="lg">Grande</Button>
API do Componente: ButtonPropTipoPadrãoDescriçãocolorstring'default'Define a paleta de cores do botão. Opções incluem primary, alternative, dark, light, green, red, yellow, purple.32pillbooleanfalseSe true, aplica bordas totalmente arredondadas.32outlinebooleanfalseSe true, aplica um estilo com borda colorida e fundo transparente.32size'xs' | 'sm' | 'md' | 'lg' | 'xl''md'Define o tamanho do botão (padding e tamanho da fonte).32hrefstringundefinedSe fornecido, o botão é renderizado como uma tag <a> em vez de <button>.disabledbooleanfalseDesabilita o botão.DarkMode SwitcherO componente DarkMode fornece um botão para alternar entre os modos claro e escuro.Configuração:Primeiro, habilite a estratégia de classe no app.html:HTML<html lang="en" class="">
  <head>
   ...
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
O script do DarkMode irá adicionar e remover a classe dark do elemento <html>.Em seguida, adicione o componente ao seu layout raiz (src/routes/+layout.svelte):Svelte<script>
  import { DarkMode } from "flowbite-svelte";
  import '../app.css';
</script>

<div class="absolute top-4 right-4">
  <DarkMode />
</div>

<slot />
API do Componente: DarkModePropTipoPadrãoDescriçãoclassstring''Classes CSS para estilizar o botão do switcher.33btnClassstring...Classes CSS específicas para o botão.Slots do Componente: DarkModeSlotDescriçãolightIconPermite substituir o ícone padrão para o modo claro.33darkIconPermite substituir o ícone padrão para o modo escuro.33PaginationO PaginationNav é um componente avançado que simplifica a lógica de paginação.Configuração:Svelte<script lang="ts">
  import { PaginationNav } from "flowbite-svelte";
</script>
Exemplo de Uso:Svelte<script lang="ts">
  let currentPage = 1;
  const totalPages = 100;

  function handlePageChange(page: number) {
    currentPage = page;
    // Lógica para buscar os dados da nova página
    console.log('Página alterada para:', page);
  }
</script>

<PaginationNav
  {totalPages}
  bind:currentPage
  onPageChange={handlePageChange}
  showIcons
/>
API do Componente: PaginationNavPropTipoPadrãoDescriçãototalPagesnumber1O número total de páginas disponíveis.34currentPagenumber1A página atualmente ativa. Use bind:currentPage.34onPageChange(page: number) => voidundefinedFunção de callback executada quando uma página é alterada.34showIconsbooleanfalseExibe ícones para os botões "anterior" e "próximo".layout'pagination' | 'navigation''pagination'Define o estilo. navigation mostra apenas os botões "anterior" e "próximo".34Parte III: Personalização e TematizaçãoEsta parte explora como adaptar os componentes Flowbite-Svelte para se alinharem a um sistema de design específico, indo além do visual padrão.Capítulo 8: Estilização por ComponenteExistem várias estratégias para personalizar a aparência de componentes individuais.Aproveitando a Prop class e tailwind-mergeA maioria dos componentes do Flowbite-Svelte aceita uma prop class. Graças à dependência tailwind-merge, que é instalada como parte da configuração, as classes fornecidas através desta prop sobrepõem de forma inteligente os estilos padrão sem conflitos.35Por exemplo, se um botão tem bg-blue-500 por padrão, você pode facilmente alterá-lo:Svelte<Button class="bg-purple-700 hover:bg-purple-800">Botão Roxo</Button>
O tailwind-merge garante que bg-purple-700 substitua bg-blue-500 em vez de serem aplicadas ambas, o que causaria um comportamento indefinido.Sobrepondo Estilos de Componentes ComplexosComponentes com uma estrutura interna mais complexa, como o Banner, podem expor props de classe adicionais para atingir elementos específicos. Por exemplo, o Banner pode ter class para o contêiner externo e classInner para um invólucro interno.35 Consulte sempre a seção de "Component data" na documentação de cada componente para ver as props de classe disponíveis.Uso Estratégico do Modificador !importantEm raras ocasiões, um estilo padrão pode ser muito específico para ser sobreposto facilmente. Nesses casos, o prefixo ! do Tailwind CSS, que aplica a regra !important do CSS, pode ser usado como último recurso.35Svelte<Input class="!rounded-full" />
Esta abordagem deve ser usada com moderação, pois pode tornar a manutenção dos estilos mais difícil a longo prazo.Capítulo 9: Criando um Tema GlobalPara uma personalização consistente em toda a aplicação, a modificação do arquivo tailwind.config.cjs é o método principal e mais eficaz para o ecossistema Tailwind v3.Definindo Paletas de Cores PersonalizadasA maneira mais comum de tematizar é definir ou estender as cores. Dentro do objeto theme.extend.colors no seu tailwind.config.cjs, você pode adicionar novas paletas ou modificar as existentes, como a primary.10JavaScript// tailwind.config.cjs
theme: {
  extend: {
    colors: {
      primary: { // Modifica a paleta primária padrão
        50: '#E6F6F4',
        //...todas as outras tonalidades
        900: '#05342D'
      },
      secondary: { // Adiciona uma nova paleta secundária
        50: '#F3F4F6',
        //...
        900: '#1F2937'
      }
    }
  }
}
Agora, classes como bg-primary-500 ou text-secondary-700 usarão suas cores personalizadas.Integrando Fontes PersonalizadasPara usar fontes personalizadas, como as do Google Fonts, primeiro importe-as no seu app.html ou CSS. Em seguida, registre-as no tailwind.config.cjs.37JavaScript// tailwind.config.cjs
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui',...],
      serif: ['Merriweather', 'serif'],
      // Adiciona uma fonte personalizada
      display: ['Oswald', 'sans-serif'],
    }
  }
}
Agora você pode usar classes como font-display em seus componentes.Ajustando Espaçamento Global e Raio da BordaDa mesma forma, você pode personalizar a escala de espaçamento (spacing) e os valores de raio de borda (borderRadius) para corresponder ao seu sistema de design.37JavaScript// tailwind.config.cjs
theme: {
  extend: {
    borderRadius: {
      '4xl': '2rem', // Adiciona um novo valor de raio de borda
    }
  }
}
Padrão "Wrapper Component" para Personalização GlobalEmbora a configuração do Tailwind seja excelente para tokens globais (cores, fontes), ela não define props padrão para os componentes. Para uma consistência de design rigorosa, a melhor prática é criar sua própria biblioteca de componentes "wrapper".35Crie um novo componente, por exemplo, src/lib/components/AppButton.svelte:Svelte<script>
  import { Button } from "flowbite-svelte";
</script>

<Button color="primary" pill={true} {...$$props}>
  <slot />
</Button>
Neste exemplo, AppButton importa o Button do Flowbite-Svelte e aplica as props padrão do seu projeto (color="primary", pill={true}). Em seguida, em toda a sua aplicação, você usará <AppButton> em vez de <Button>. Isso centraliza seu sistema de design, torna as atualizações mais fáceis e garante que todos os botões tenham uma aparência consistente. Este padrão é altamente recomendado para projetos de médio a grande porte.Parte IV: Padrões de Implementação Avançados com SvelteKitEsta seção conecta o Flowbite-Svelte com os recursos do SvelteKit, demonstrando padrões de aplicação do mundo real.Capítulo 10: Gerenciando Estado com Svelte StoresSvelte Stores são a maneira idiomática de gerenciar o estado que precisa ser compartilhado entre componentes não relacionados.Construindo uma UI de Carrinho de ComprasEste exemplo prático demonstra como usar um writable store para gerenciar um carrinho de compras.401. Crie o Store (src/lib/cartStore.js):JavaScriptimport { writable } from 'svelte/store';

export const cartItems = writable();

export function addToCart(product) {
  cartItems.update(items => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return items;
    }
    return [...items, {...product, quantity: 1 }];
  });
}
2. Use o Store nos Componentes:Componente do Produto (ProductCard.svelte):Svelte<script>
  import { Card, Button } from 'flowbite-svelte';
  import { addToCart } from '$lib/cartStore.js';
  export let product;
</script>

<Card>
  <h5>{product.name}</h5>
  <p>${product.price}</p>
  <Button on:click={() => addToCart(product)}>Adicionar ao Carrinho</Button>
</Card>
Componente da Navbar (Navbar.svelte):Svelte<script>
  import { Navbar, Badge } from 'flowbite-svelte';
  import { cartItems } from '$lib/cartStore.js';
  import { CartSolid } from 'flowbite-svelte-icons';

  let totalItems = 0;
  cartItems.subscribe(items => {
    totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  });
</script>

<Navbar>
  <div>
    <CartSolid class="w-6 h-6" />
    {#if totalItems > 0}
      <Badge color="red" class="absolute -top-2 -right-2">{totalItems}</Badge>
    {/if}
  </div>
</Navbar>
Este padrão desacopla completamente os componentes. O ProductCard não precisa saber sobre a Navbar e vice-versa; ambos interagem com o cartStore central.Capítulo 11: Dados Dinâmicos com a Função loadA função load do SvelteKit é a maneira correta de buscar dados para uma página antes que ela seja renderizada.42Buscando Dados para um Componente Table1. Crie a Função load (src/routes/produtos/+page.server.js):JavaScript// Suponha que você tenha uma função que busca dados de um banco de dados ou API
import { fetchProductsFromDB } from '$lib/server/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const products = await fetchProductsFromDB();
  return {
    products
  };
}
2. Renderize os Dados na Página (src/routes/produtos/+page.svelte):Conforme discutido no Capítulo 6, use um bloco #each para renderizar os dados na tabela, garantindo a reatividade.30Svelte<script>
  import { Table, TableBody, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let data; // Dados vindos da função `load`
</script>

<h1>Nossos Produtos</h1>
<Table>
  <TableHead>
    <TableHeadCell>Produto</TableHeadCell>
    <TableHeadCell>Preço</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each data.products as product (product.id)}
      <TableBodyRow>
        <TableBodyCell>{product.name}</TableBodyCell>
        <TableBodyCell>${product.price}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
Capítulo 12: Manuseio Robusto de Formulários e ValidaçãoO Flowbite-Svelte se integra perfeitamente com as form actions do SvelteKit para um manuseio de formulários robusto e com aprimoramento progressivo.Integrando Formulários com Ações do SvelteKitEste exemplo mostra um formulário de inscrição que envia dados para uma form action e exibe feedback de validação.281. Crie a Ação do Formulário (src/routes/register/+page.server.js):JavaScriptimport { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email) {
      return fail(400, { email, missing: true, message: 'O e-mail é obrigatório.' });
    }

    if (password.length < 8) {
      return fail(400, { email, incorrect: true, message: 'A senha deve ter pelo menos 8 caracteres.' });
    }

    // Lógica para registrar o usuário...

    return { success: true };
  }
};
2. Crie o Formulário no Frontend (src/routes/register/+page.svelte):Svelte<script>
  import { Input, Label, Helper, Button } from 'flowbite-svelte';
  export let form; // Prop especial do SvelteKit para dados de formulário
</script>

<form method="POST" class="space-y-4">
  <div>
    <Label for="email" class="mb-2" color={form?.missing? 'red' : 'gray'}>Email</Label>
    <Input name="email" type="email" value={form?.email?? ''} color={form?.missing? 'red' : 'gray'} />
    {#if form?.missing}
      <Helper color="red" class="mt-2">{form.message}</Helper>
    {/if}
  </div>
  <div>
    <Label for="password" class="mb-2" color={form?.incorrect? 'red' : 'gray'}>Senha</Label>
    <Input name="password" type="password" color={form?.incorrect? 'red' : 'gray'} />
    {#if form?.incorrect}
      <Helper color="red" class="mt-2">{form.message}</Helper>
    {/if}
  </div>
  <Button type="submit">Registrar</Button>

  {#if form?.success}
    <p class="text-green-500">Registro bem-sucedido!</p>
  {/if}
</form>
Neste padrão, a validação ocorre no servidor. A função fail retorna os dados submetidos e uma mensagem de erro.45 O frontend usa a prop form para preencher novamente os campos e exibir mensagens de erro contextuais, usando as props de cor (red ou green) dos componentes Flowbite para fornecer feedback visual claro.28Parte V: Produção e ManutençãoEsta parte aborda tópicos essenciais para enviar uma aplicação robusta, performática e de fácil manutenção para produção.Capítulo 13: Otimização de Desempenho: Purificação de CSSUm dos maiores desafios ao usar bibliotecas de UI baseadas em Tailwind é o tamanho do arquivo CSS final. Por padrão, o Tailwind pode gerar um arquivo CSS muito grande, incluindo estilos para componentes que você nem está usando.Diagnosticando o Tamanho do Pacote CSSApós construir seu projeto para produção (npm run build), você pode inspecionar o tamanho dos arquivos CSS gerados no diretório .svelte-kit/output.47 É comum que o tamanho inicial seja superior a 120 KB, o que é excessivo para a maioria das aplicações web.Implementando vite-plugin-tailwind-purgecssA solução para este problema é usar um plugin que remove de forma inteligente o CSS não utilizado. O vite-plugin-tailwind-purgecss é a ferramenta recomendada para este ecossistema.47O funcionamento do plugin é mais sofisticado do que a configuração padrão do Tailwind. Enquanto o Tailwind escaneia os arquivos em content e gera CSS para todas as classes que encontra (incluindo as de componentes não utilizados da biblioteca), o vite-plugin-tailwind-purgecss analisa o grafo de módulos do Vite durante o processo de build. Isso permite que ele identifique exatamente quais componentes foram importados e usados em sua aplicação, purgando todas as classes do Tailwind que não são necessárias.48 A redução no tamanho do CSS pode ser drástica, frequentemente superior a 80%.1. Instalação:Bashnpm install -D vite-plugin-tailwind-purgecss
2. Configuração (vite.config.js):Adicione o plugin ao seu arquivo de configuração do Vite.47JavaScriptimport { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss'; // Importe o plugin

export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss(), // Adicione o plugin aqui
  ],
});
Com esta configuração, cada build de produção (npm run build) resultará em um arquivo CSS significativamente menor e otimizado. O uso deste plugin não é opcional, mas sim uma prática essencial para qualquer projeto Flowbite-Svelte destinado à produção.Capítulo 14: Um Guia para Acessibilidade (A11y)Construir aplicações acessíveis é uma responsabilidade fundamental do desenvolvedor. O Flowbite-Svelte fornece uma base sólida, mas a implementação correta ainda depende do desenvolvedor.Atributos e Papéis ARIA nos Componentes FlowbiteAccessible Rich Internet Applications (ARIA) é um conjunto de atributos que tornam o conteúdo web mais acessível, especialmente para usuários de tecnologias assistivas como leitores de tela.50 Componentes interativos complexos como Modais e Dropdowns dependem fortemente de ARIA para comunicar seu estado (aberto/fechado) e função.Primeira Regra de ARIA: Sempre prefira usar um elemento HTML nativo se ele tiver a semântica e o comportamento necessários. Por exemplo, use <button> para ações em vez de um <div> com role="button".50Implementação no Flowbite: Os componentes do Flowbite geralmente incluem os atributos ARIA necessários. Por exemplo, um Modal aberto terá aria-modal="true" e o body da página pode receber aria-hidden="true" para ocultar o conteúdo de fundo dos leitores de tela.Garantindo a Navegabilidade por TecladoTodos os elementos interativos devem ser alcançáveis e operáveis usando apenas o teclado.Foco: Os componentes interativos do Flowbite, como Modal e Dropdown, são projetados para "prender" o foco do teclado dentro deles quando abertos, impedindo que o usuário navegue acidentalmente para elementos de fundo.21Eventos de Teclado: A tecla ESC geralmente fecha componentes de sobreposição como Modal e Tooltip.21Decisões de Design: A biblioteca faz escolhas conscientes de acessibilidade. Por exemplo, a prop autofocus foi removida de componentes como Input porque o foco automático pode ser desorientador para usuários de leitores de tela, que são "teletransportados" para o controle de formulário sem contexto.52Melhores Práticas para Suporte a Leitores de TelaRótulos Explícitos: Sempre associe um <Label> a um controle de formulário (Input, Checkbox, etc.) usando a prop for. Isso garante que os leitores de tela anunciem o propósito do campo quando ele recebe foco.53Labels para Ícones: Para botões que contêm apenas um ícone, é crucial fornecer um rótulo textual para leitores de tela usando o atributo aria-label.Svelte<Button aria-label="Fechar modal">
  <CloseIcon />
</Button>
Texto Alternativo: Para imagens, use a prop alt para descrever o conteúdo da imagem. Evite palavras redundantes como "imagem de" ou "foto de", pois o leitor de tela já anuncia que é uma imagem.53Capítulo 15: Solução de Problemas ComunsEsta seção aborda os problemas mais frequentes encontrados ao trabalhar com a biblioteca.Conflitos de Estilo e Erros de ConfiguraçãoComponentes Sem Estilo: O problema mais comum é a aparência de componentes sem estilo ou parcialmente estilizados.55 A causa quase sempre reside em uma das seguintes falhas de configuração:O caminho para node_modules/flowbite-svelte está ausente do array content em tailwind.config.cjs.10O plugin require('flowbite/plugin') está ausente do array plugins em tailwind.config.cjs.10O arquivo src/app.css com as diretivas @tailwind não está sendo importado no layout raiz (+layout.svelte).Cores Primárias Ausentes: Se os componentes que usam a cor primary aparecem em preto ou cinza, é porque a paleta de cores primary não foi definida na seção theme.extend do tailwind.config.cjs.10Comportamento de Componentes InterativosDropdown/Modal Não Abre/Fecha: Geralmente, isso é causado por um uso incorreto da diretiva bind:open. Certifique-se de que a variável vinculada está sendo alterada corretamente por um evento on:click ou outra lógica.56Eventos Inesperados: Um clique em um componente pode acionar um evento em outro. Isso pode ser um problema de propagação de eventos do DOM. Use o modificador de evento .stopPropagation do Svelte para controlá-lo.O Bloco {#key} para Recriar ComponentesO SvelteKit frequentemente reutiliza componentes de layout ao navegar entre páginas. Se um componente precisa ter seu estado reiniciado (por exemplo, um formulário de pesquisa na Navbar), o bloco {#key} do Svelte é a solução perfeita. Envolver um componente em um bloco {#key} fará com que o Svelte o destrua e o recrie sempre que o valor da chave mudar.47Svelte<script>
  import { page } from '$app/stores';
  import { Navbar } from 'flowbite-svelte';
</script>

{#key $page.url.pathname}
  <Navbar>
    </Navbar>
{/key}
Capítulo 16: Guia de ImplantaçãoImplantar um projeto SvelteKit com Flowbite-Svelte é geralmente simples, mas alguns problemas podem surgir em ambientes de produção como Vercel ou Netlify.Configurando para Plataformas de ImplantaçãoA maioria das plataformas detecta automaticamente projetos SvelteKit e aplica as configurações de build corretas. O uso do @sveltejs/adapter-auto ou de adaptadores específicos (como @sveltejs/adapter-vercel) lida com a maior parte da configuração.Armadilhas Comuns na ImplantaçãoSensibilidade a Maiúsculas e Minúsculas (Case-Sensitivity): Este é um dos erros mais comuns e difíceis de depurar. Ambientes de desenvolvimento em Windows ou macOS geralmente são insensíveis a maiúsculas e minúsculas, enquanto os ambientes de build baseados em Linux (usados pela Vercel, Netlify, etc.) são sensíveis. Um erro de digitação no nome do arquivo de um componente (ex: import from './SideBar.svelte' quando o arquivo é Sidebar.svelte) funcionará localmente, mas causará uma falha de "arquivo não encontrado" na implantação.57 Sempre verifique se os nomes dos arquivos e as importações correspondem exatamente.Erros de Resolução de Módulos: Erros como Rollup failed to resolve import podem ocorrer se uma dependência não estiver configurada corretamente para renderização no lado do servidor (SSR).58 A solução comum é adicionar o pacote problemático à lista ssr.noExternal no seu vite.config.js, o que instrui o Vite a empacotar essa dependência em vez de tentar importá-la como um módulo externo no servidor.Tempos Limite de Build (Build Timeouts): Builds que demoram mais de 45 minutos podem falhar em plataformas como a Vercel.59 Embora raramente seja um problema direto do Flowbite-Svelte, isso pode ser causado por dependências pesadas, configurações de SCSS ineficientes ou outros gargalos no processo de build.Parte VI: O Caminho a SeguirEsta parte final contextualiza a versão v0.48.6 e oferece uma visão de alto nível sobre futuras migrações.Capítulo 17: Migrando do Svelte 4 para o Svelte 5A transição para o Svelte 5 é uma atualização significativa que requer planejamento.Visão Geral das Mudanças Quebradas no Svelte 5 (Runes)Reatividade Explícita: O Svelte 5 abandona a reatividade implícita baseada em atribuições e no rótulo $ em favor de "runes" explícitos. O estado reativo agora é declarado com $state(), e o estado derivado com $derived().6Snippets em vez de Slots: A sintaxe de let: e <svelte:fragment> para passar dados de slots foi substituída pela sintaxe {#snippet...}, que é mais poderosa e consistente.6API de Componentes: Componentes não são mais classes, o que altera a forma como são manipulados programaticamente.7Mudanças nas Versões Mais Recentes do flowbite-svelteCompatibilidade com Svelte 5: Versões posteriores à v0.48.6 são projetadas para o Svelte 5 e usam runes internamente, tornando-as incompatíveis com projetos Svelte 4.5Configuração do Tailwind v4: As versões mais recentes adotam a configuração do Tailwind v4, que move a configuração de plugins e temas do tailwind.config.js para o arquivo CSS principal usando diretivas @.13Uma Estratégia de Alto Nível para Atualizações FuturasA atualização de um projeto que usa flowbite-svelte@0.48.6 para uma versão mais recente seria um processo de duas etapas:Migrar a Aplicação para o Svelte 5: Use a ferramenta de migração oficial (npx sv migrate svelte-5) para converter seu código para a nova sintaxe de runes e snippets.6Atualizar a Dependência flowbite-svelte: Após a migração bem-sucedida do seu aplicativo, atualize a versão do flowbite-svelte no seu package.json para a mais recente e ajuste a configuração do Tailwind para a abordagem baseada em CSS do v4.Este é um esforço considerável. Manter um projeto estável no Svelte 4 com flowbite-svelte@0.48.6 é uma escolha perfeitamente válida e robusta. O propósito deste guia é garantir que os desenvolvedores que fazem essa escolha tenham a documentação mais completa e precisa possível para serem produtivos e bem-sucedidos.