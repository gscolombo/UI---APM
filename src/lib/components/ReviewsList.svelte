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
</style>
