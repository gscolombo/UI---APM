<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    if (document) {
      const section = document.getElementById('inicio');
      const navbar = document.getElementsByTagName('nav').item(0);

      console.log(section && navbar ? true : false);

      if (section && navbar)
        section.style.height = `calc(100vh - ${navbar?.clientHeight}px)`;
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

<style lang="scss">
  section {
    background-image: url('/images/home_bg.png');
    background-size: cover;
    background-position: 80% 50%;
    background-color: var(--primary-red);
    padding: 0 2rem;

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
        transition: 150ms ease-in-out transform, 150ms ease-in-out box-shadow;
        cursor: pointer;
        &:hover {
            transform: scale3d(1.05, 1.05, 1.05);
            box-shadow: -10px 10px #00000055;
        }
      }
    }
  }
</style>
