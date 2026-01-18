<script lang="ts">
  export let rating: number = 0;
  export let size: 'sm' | 'md' | 'lg' = 'sm';

  const clipPath = `rect(0% ${(rating / 5.0) * 100}% 100% 0%)`;
</script>

<div class="star-rating-container">
  <!-- Empty stars -->
  <div class="empty-stars">
    {#each { length: 5 } as _}
      <i
        class="bi bi-star {size === 'sm'
          ? 'fs-6'
          : size === 'lg'
            ? 'fs-2'
            : 'fs-4'}"
      ></i>
    {/each}
  </div>

  <!-- Filled stars (clipped based on rating) -->
  <div class="filled-stars" style="clip-path: {clipPath};">
    {#each { length: 5 } as _}
      <i
        class="bi bi-star-fill {size === 'sm'
          ? 'fs-6'
          : size === 'lg'
            ? 'fs-2'
            : 'fs-4'}"
      ></i>
    {/each}
  </div>
</div>

<style lang="scss">
  .star-rating-container {
    display: grid;
    grid-template-columns: 1fr;
  }

  .empty-stars,
  .filled-stars {
    grid-area: 1/1;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    width: fit-content;
    color: var(--primary-red);
  }
</style>
