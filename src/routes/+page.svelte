<script lang="ts">
  import Reviews from '$lib/components/ReviewsList.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  // Logic to remove navigation bar height from sections height
  import { onMount } from 'svelte';

  onMount(() => {
    if (document) {
      const sections = Array.from(document.getElementsByTagName('section'));
      const navbar = document.getElementsByTagName('nav').item(0);

      if (sections.length && navbar)
        sections.forEach((section) => {
          section.style.paddingTop = `${navbar?.clientHeight}px`;
        });
    }
  });
</script>

<!-- Início -->
<section id="inicio">
  <div class="content">
    <h1>ADVOGADA<br />CRIMINAL</h1>
    <p>
      Atuação ética, atendimento personalizado e qualificado, com assessoramento
      em delegacia e em todas as fases do processo.
    </p>
    <button>Precisa de ajuda?<br />Envie uma mensagem</button>
  </div>
</section>

<section id="sobre">
  <div class="container">
    <div class="text-content">
      <h2>SOBRE</h2>
      <div class="name_oab">
        <h3>Ana Paula Miranda |</h3>
        <h4>OAB/DF 80.787</h4>
      </div>
      <pre>{data.introductionText}</pre>
    </div>
    <img src={data.profile} alt="" />
  </div>
  <div class="testimonials">
    <h3>DEPOIMENTOS DE CLIENTES</h3>
    <Reviews reviews={data.reviews} />
    <a href="https://maps.app.goo.gl/TSx8X4jrwiHbWL6F6" target="_blank"
      >Veja todas as avaliações <i class="bi bi-geo-alt-fill"></i></a
    >
  </div>
</section>

<section id="areas_de_atuacao">
  <h2>ÁREAS DE ATUAÇÃO</h2>
</section>

<style lang="scss">
  // Início
  section#inicio {
    background-image: url('/images/home_bg.png');
    background-size: cover;
    background-position: 80% 50%;
    background-color: var(--primary-red);
    padding: 0 2rem;
    height: 100vh;

    .content {
      padding: 10rem 0 10rem 5%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      width: 50%;

      h1,
      p,
      button {
        color: var(--primary-white);
        font-weight: 700;
      }

      h1 {
        font-size: 5.5rem;
      }

      p,
      button {
        font-size: 2rem;
      }

      button {
        width: fit-content;
        outline: none;
        border: none;
        padding: 10px 40px;
        background-color: var(--primary-brown);
        transition:
          150ms ease-in-out transform,
          150ms ease-in-out box-shadow;
        cursor: pointer;
        &:hover {
          transform: scale3d(1.05, 1.05, 1.05);
          box-shadow: -10px 10px #00000055;
        }
      }
    }
  }

  // Sobre
  section#sobre {
    width: 100vw;
    padding: 2rem;

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      gap: 40px;
      margin-top: 20px;

      .text-content {
        width: 50%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h2 {
          color: var(--secondary-red);
        }

        h3,
        h4 {
          color: var(--primary-brown);
        }

        h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .name_oab {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 30px;

          h3 {
            font-size: 2rem;
          }

          h4 {
            font-size: 1.5rem;
          }
        }

        pre {
          display: flex;
          flex: 1;
          white-space: pre-wrap;
          height: fit-content;
          font-size: clamp(1rem, 2.5vh, 1.75rem);
          color: var(--primary-red);
          font-weight: 500;
        }
      }
    }

    .testimonials {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      h3 {
        font-weight: 700;
        font-size: 2rem;
        color: var(--primary-red);
      }

      a {
        padding: 10px 20px;
        align-self: flex-start;
        text-decoration: none;
        background-color: var(--primary-red);
        color: white;
        font-weight: 700;
        font-size: 1.25rem;
        transition:
          150ms ease-in-out transform,
          150ms ease-in-out box-shadow;
        &:hover {
          transform: scale3d(1.05, 1.05, 1.05);
          box-shadow: -5px 5px #00000055;
        }
      }
    }
  }
</style>
