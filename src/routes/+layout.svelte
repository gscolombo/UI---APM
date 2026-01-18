<script lang="ts">
  import type { LayoutProps } from './$types';
  import favicon from '$lib/assets/favicon.svg';

  import '../reset.css';
  import '../app.css';

  let { data, children }: LayoutProps = $props();
</script>

<!-- <head> tag to be shown in every page of the app -->
<svelte:head>
  <title>{data.siteName}</title>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
  />
</svelte:head>

<!-- navigation bar -->
<nav>
  <img src={data.siteLogoURL} alt="" />
  <div class="buttons">
    <a href="/#inicio">Início</a>
    <a href="/#sobre">Sobre</a>
    <a href="/#areas_de_atuacao">Áreas de atuação</a>
    <a href="/#areas_de_atuacao">Blog</a>
    <a href="/#contato">Contato</a>
  </div>
</nav>

{@render children()}

<style lang="scss">
  $enable-important-utilities: false;
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--primary-brown);
    position: sticky;
    top: 0;
    width: 100vw;

    .buttons {
      display: flex;
      gap: 20px;

      a {
        text-decoration: none;
        color: var(--primary-white);
        font-weight: 700;
        font-size: 1.25rem;
        transition:
          150ms ease-in transform,
          150ms ease-in opacity;
        opacity: 0.9;
        &:hover {
          transform: scale3d(1.1, 1.1, 1.1);
          opacity: 1;
        }
      }
    }
  }
</style>
