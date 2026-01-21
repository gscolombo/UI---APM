<script lang="ts">
  import type { LayoutProps } from './$types';
  import favicon from '$lib/assets/favicon.svg';
  import spain from '$lib/assets/spain.png';

  import '../reset.css';
  import '../app.css';

  let { data, children }: LayoutProps = $props();
  let showMobileMenu = $state(false);

  $effect(() => {
    if (showMobileMenu) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = '';
  });
</script>

<!-- <head> tag to be shown in every page of the app -->
<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
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
  <script
    src="https://kit.fontawesome.com/80d53e6a74.js"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<!-- navigation bar -->
<nav>
  <img src={data.siteLogoURL} alt="" />
  <div class="buttons">
    <a href="/#inicio">Início</a>
    <a href="/#sobre">Sobre</a>
    <a href="/#areas_de_atuacao">Áreas de atuação</a>
    <a href="/#contato">Contato</a>
  </div>
  <button
    class="mobile-menu-btn"
    onclick={() => (showMobileMenu = true)}
    aria-label="mobile-menu"
  >
    <i class="bi bi-list"></i>
  </button>
</nav>

<div class="mobile-menu" style:display={showMobileMenu ? 'flex' : 'none'}>
  <button
    class="close-btn"
    onclick={() => (showMobileMenu = false)}
    aria-label="mobile-menu"
  >
    <i class="bi bi-x-lg"></i>
  </button>
  <a href="/#inicio" onclick={() => (showMobileMenu = false)}>Início</a>
  <a href="/#sobre" onclick={() => (showMobileMenu = false)}>Sobre</a>
  <a href="/#areas_de_atuacao" onclick={() => (showMobileMenu = false)}
    >Áreas de atuação</a
  >
  <a href="/#contato" onclick={() => (showMobileMenu = false)}>Contato</a>
</div>

{@render children()}

<!-- Contact form with footer -->
<section id="contato">
  <div class="container-fluid">
    <div class="contact-info">
      <h1>ADVOGADA CRIMINAL</h1>
      <div class="banner">
        ENTRE EM CONTATO
        <span>ATENDIMENTO 24H</span>
      </div>
      <p>some text</p>
      <ul>
        <li><i class="bi bi-whatsapp"></i>phone_number</li>
        <li><i class="bi bi-envelope-at-fill"></i>email</li>
      </ul>
    </div>
    <div class="contact-form">
      <form action="POST">
        <input type="text" name="name" placeholder="NOME" required />
        <input
          type="tel"
          name="phoneNumber"
          pattern={'([0-9]{2,3}) [1-9][0-9]{3,4}-[0-9]{4}'}
          placeholder="TELEFONE"
        />
        <input type="email" name="email" placeholder="E-MAIL" required />
        <textarea name="message" id="message" placeholder="MENSAGEM" required
        ></textarea>
        <button>ENVIAR</button>
      </form>
    </div>
  </div>
</section>

<footer>
  <div class="content">
    <div class="disclaimer">
      <img src={data.siteLogoURL} alt="" />
      <p>
        Este site contém informações e materiais de caráter exclusivamente
        informativo e não devem ser interpretados como aconselhamento jurídico.
        O uso do site não cria relação advogada-cliente.
      </p>
    </div>
    <div class="contacts">
      <h1>Contatos</h1>
      <ul>
        <li><i class="bi bi-whatsapp"></i>phone_number</li>
        <li><i class="bi bi-envelope-at-fill"></i>email</li>
      </ul>
    </div>
    <div class="accessibility">
      <h1>Atendimento acessível</h1>
      <ul>
        <li><i class="fa-solid fa-hands"></i>LIBRAS</li>
        <li><img src={spain} alt="Bandeira da Espanha" />ESPANHOL</li>
        <li>Atendimento em todo o Brasil.</li>
        <li>Flagrantes 24h no DF e entorno.</li>
      </ul>
    </div>
  </div>
  <p class="copyright">
    &copy; Todos os direitos reservados - Ana Paula Miranda Silva | Advogada
    Criminal - {new Date().getFullYear()}
  </p>
</footer>

<style lang="scss">
  $enable-important-utilities: false;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--primary-brown);
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 10;
    border-bottom: 2.5px solid var(--primary-red);

    img {
      max-height: 72px;
    }

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

        &:hover,
        &:global(.active) {
          transform: scale3d(1.1, 1.1, 1.1);
          opacity: 1;
        }

        &:global(.active) {
          padding-bottom: 5px;
          border-bottom: 2.5px solid var(--primary-red);
        }
      }
    }

    .mobile-menu-btn {
      display: none;
    }
  }

  section#contato {
    height: 100vh;
    background-color: var(--primary-white);

    .container-fluid {
      padding: 3rem;
      background-color: var(--primary-red);
      display: grid;
      height: 100%;
      width: 100%;
      grid-template-columns: 1fr 1fr;
    }

    .contact-info {
      grid-column: 1/2;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      h1 {
        font-size: 4rem;
        color: var(--primary-white);
      }

      .banner {
        background-color: var(--primary-brown);
        display: flex;
        max-width: 560px;
        flex-direction: column;
        text-align: center;
        padding: 2rem 4rem;
        font-size: 2.5rem;
        gap: 20px;
        color: var(--primary-white);
        font-weight: 700;

        span {
          color: var(--primary-red);
        }
      }

      p {
        color: var(--primary-white);
        font-weight: 500;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          color: var(--primary-white);
        }
      }
    }

    .contact-form {
      display: flex;
      align-items: center;

      form {
        display: grid;
        grid-template-rows: 4rem 4rem 4rem 1fr;
        gap: 20px;
        width: 100%;
        height: 100%;

        input,
        textarea {
          padding: 1rem;
          font-size: 2rem;
          font-weight: 700;
          outline: none;
          border: none;
          background-color: var(--primary-white);
          color: var(--secondary-red);
        }

        textarea {
          font-size: 1.25rem;
          resize: none;
        }

        button {
          padding: 10px 2rem;
          width: fit-content;
          font-size: 1.5rem;
          justify-self: flex-end;
          border: none;
          outline: none;
          background-color: var(--primary-brown);
          font-weight: 700;
          color: var(--primary-white);
          transition:
            150ms ease-in-out transform,
            150ms ease-in-out box-shadow;
          cursor: pointer;
          &:hover {
            transform: scale3d(1.05, 1.05, 1.05);
            box-shadow: 10px 10px #00000055;
          }
        }
      }
    }
  }

  footer {
    background-color: var(--secondary-brown);
    border-top: 10px solid var(--primary-brown);

    .content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 1rem 2rem 2rem 2rem;
      gap: 10rem;

      .disclaimer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        img {
          max-height: 72px;
          align-self: flex-start;
        }

        p {
          color: var(--primary-white);
          font-weight: 700;
          font-size: 1.125rem;
        }
      }

      .contacts,
      .accessibility {
        display: flex;
        flex-direction: column;
        gap: 10px;

        h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-red);
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 0;

          li {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.25rem;
            color: var(--primary-white);
            font-weight: 700;

            &:nth-of-type(3n) {
              color: var(--primary-red);
            }
            &:nth-of-type(4n) {
              margin-top: -10px;
              color: var(--primary-red);
            }
          }
        }
      }

      .accessibility ul li img {
        max-height: 24px;
      }
    }

    .copyright {
      margin: 0;
      text-align: center;
      padding: 1rem 2rem;
      background-color: var(--primary-brown);
      color: var(--primary-red);
      font-size: 1rem;
      font-weight: 700;
    }
  }

  @import './+layout.mobile.scss';
</style>
