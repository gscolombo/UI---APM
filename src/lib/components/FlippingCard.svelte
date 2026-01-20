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
    border: 2px solid var(--primary-red);

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
          background: linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.9));
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

  /* Small Mobile Devices */
  @media (max-width: 480px) {
    .card {
      .front {
        .content {
          .after {
            h1 {
              font-size: 1rem;
            }
          }
        }

        button {
          font-size: 0.9rem;
          padding: 6px 12px;
        }
      }

      .back {
        p {
          font-size: 0.9rem;
          padding: 0.7rem;
        }

        button {
          font-size: 0.85rem;
        }
      }
    }
  }

  /* Medium Size Mobile Devices */
  @media (max-width: 768px) {
    .card {
      min-width: 100%;
      margin: 0 auto;
      user-select: none;
      box-shadow: 0px 3px 8px 3px #00000022;
      scroll-snap-align: center;

      .front {
        grid-template-rows: 4fr 1fr;
        gap: 8px;

        .content {
          .after {
            h1 {
              font-size: 1.1rem;
              padding-bottom: 8px;
              text-align: center;
            }
          }
        }

        button {
          font-size: 1rem;
          padding: 8px 16px;
          width: 90%;
          max-width: 200px;

          &:hover {
            transform: none; /* Remove hover effect on mobile */
          }
        }
      }

      .back {
        grid-template-rows: 4fr 1fr;

        p {
          font-size: 0.95rem;
          padding: 0.8rem;
          line-height: 1.4;
          overflow-y: auto;
          user-select: text;
        }

        button {
          font-size: 0.9rem;
          padding: 6px 12px;
          margin-right: 8px;

          &:hover {
            transform: none; /* Remove hover effect on mobile */
          }
        }
      }
    }
  }

  /* Tablet Styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    .card {
      width: 100%;
      height: 300px;

      .front {
        .content {
          .after {
            h1 {
              font-size: 1.2rem;
            }
          }
        }

        button {
          font-size: 1.1rem;
        }
      }

      .back {
        p {
          font-size: 1rem;
        }

        button {
          font-size: 1rem;
        }
      }
    }
  }
</style>
