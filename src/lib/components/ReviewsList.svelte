<script lang="ts">
  import type Review from '$lib/interfaces/Review';
  import StarRating from './StarRating.svelte';

  const { reviews }: { reviews: Review[] } = $props();
</script>

<div class="reviews">
  {#each reviews as review}
    <div class="card">
      <div class="card-body">
        <StarRating rating={review.rating} size="sm" />
        <i class="rating-number">{review.rating}</i>
        <p class="card-text">{review.reviewText}</p>
        <div class="_card-footer">
          <span>{review.publishTime}</span>
          <i class="author-initials">{review.author}</i>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .reviews {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    .card-body {
      display: grid;
      grid-template-rows: min-content min-content 1fr min-content;
      justify-items: center;
      gap: 10px;
      min-height: 250px;
      background-color: var(--primary-brown);
      color: var(--primary-white);

      .card-text {
        font-weight: 700;
        background-color: #00000048;
        padding: 20px;
        overflow-y: scroll;
        border-bottom: 1px solid var(--primary-red);
        border-radius: 4px;
      }

      ._card-footer {
        display: flex;
        width: 100%;
        justify-content: space-between;

        i.author-initials {
          justify-self: right;
          font-weight: 700;
        }
      }
    }
  }

  /* Extra Small Mobile Devices */
  @media (max-width: 480px) {
    .reviews {
      gap: 15px;

      .card {
        .card-body {
          min-height: 180px;
          padding: 1rem;
          gap: 12px;

          .card-text {
            font-size: 0.95rem;
          }

          ._card-footer {
            span {
              font-size: 0.85rem;
            }

            i.author-initials {
              font-size: 0.95rem;
            }
          }
        }
      }
    }

    .rating-number {
      font-size: 1.1rem;
    }
  }

  /* Medium-Size Mobile Devices */
  @media (max-width: 768px) {
    .reviews {
      grid-template-columns: repeat(5, 100%);
      padding: 1rem;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      .card {
        width: 100%;
        scroll-snap-align: center;

        .card-body {
          height: 360px;
          padding: 1.5rem;
          gap: 15px;

          .card-text {
            font-size: 1rem;
            line-height: 1.5;
          }

          ._card-footer {
            flex-direction: column-reverse;
            align-items: center;
            gap: 10px;

            span {
              font-size: 0.9rem;
            }

            i.author-initials {
              font-size: 1rem;
              font-style: normal;
              font-weight: 700;
            }
          }
        }
      }
    }

    /* Adjust StarRating component for mobile */
    .card-body > :first-child {
      /* Target the StarRating component */
      transform: scale(0.9);
    }

    .rating-number {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

  /* Tablet Styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    .reviews {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      padding: 1rem;

      .card {
        .card-body {
          min-height: 220px;
          padding: 1.5rem;

          .card-text {
            font-size: 1rem;
            line-height: 1.4;
          }
        }
      }
    }
  }
</style>
