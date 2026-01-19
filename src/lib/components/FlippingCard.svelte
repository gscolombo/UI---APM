<script lang="ts">
  import type ActingArea from '$lib/interfaces/ActingArea';

  let flipped = $state(false);

  const flip = () => (flipped = !flipped);

  const { area }: { area: ActingArea } = $props();
</script>

<div class={['card', { flipped }]}>
  <div class="front">
    <div class="content">
      <img src={area.imgSrc} alt="" />
      <div class="after">
        <h1>{area.title}</h1>
      </div>
    </div>

    <button onclick={flip}>Saiba mais</button>
  </div>
  <div class="back">
    <p>{area.description}</p>
    <button onclick={flip}> Voltar </button>
  </div>
</div>

<style lang="scss">
  .card {
    width: 20vw;
    height: 320px;
    transform: rotateY(360deg);
    transition: transform 0.4s;
    transform-style: preserve-3d;
    border-radius: 0px;
    box-shadow: 0px 4px 10px 4px #00000018;
    display: grid;
    grid-template-rows: 100%;

    .front,
    .back {
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      grid-area: 1/1;

      button {
        padding: 10px 20px;
        background-color: var(--primary-red);
        color: var(--primary-white);
        outline: none;
        border: none;
        font-weight: 700;
        transition: transform 100ms ease-in-out;
        font-size: 1.25rem;
        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .front {
      display: grid;
      grid-template-rows: 3fr 1fr;
      gap: 10px;
      align-items: center;
      justify-items: center;
      background-color: var(--primary-brown);

      .content {
        display: grid;
        grid-template-rows: 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
        justify-items: center;

        img,
        .after {
          grid-area: 1/1;
          min-width: 100%;
        }

        img {
          max-height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        .after {
          background: linear-gradient(rgba(0,0,0,0) 40%, rgba(0,0,0,0.9));
          display: flex;
          justify-content: center;
          h1 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary-white);
            align-self: flex-end;
            padding-bottom: 10px;
          }
        }
      }
    }

    .back {
      transform: rotateY(180deg);
      background-color: var(--primary-brown);
      display: grid;
      grid-template-rows: 5fr 1fr;

      button {
        width: fit-content;
        justify-self: flex-end;
        align-self: center;
        font-size: 1rem;
        margin-right: 10px;
      }

      p {
        overflow-y: scroll;
        padding: 1rem;
        border-bottom: 1px solid var(--primary-red);
        color: var(--primary-white);
        background-color: #0000002a;
        font-size: 1.125rem;
      }
    }
  }

  .card.flipped {
    transform: rotateY(180deg);
  }
</style>
