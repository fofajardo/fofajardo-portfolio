<script lang="ts">
  let { quote, author }: { quote: string; author: string } = $props();
</script>

<div class="big-quote-container">
  <blockquote>
    <p class="quote-text">
      “{quote}”
    </p>
    <cite class="quote-author">
      — {author}
    </cite>
  </blockquote>
</div>

<style>
  .big-quote-container {
    max-width: var(--layout-max-width);
    margin: 2.5em auto;
    padding: 0 10px;
    text-align: center;
  }
  blockquote {
    margin: 0 auto;
    padding: 1.5em;
    border: none !important;
    text-align: center;
    opacity: 1 !important;
  }
  .quote-text {
    font-family: "Instrument Serif", Georgia, Garamond, serif;
    font-size: 2.25em;
    line-height: 1.25;
    margin: 0 0 0.5em 0;
    color: var(--text-main);
    letter-spacing: -0.02em;
    font-style: italic;
    text-align: center;
  }
  .quote-author {
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-main);
    opacity: 0.85;
    font-style: normal;
    display: block;
    text-align: center;
  }
  @media screen and (max-width: 625px) {
    .quote-text {
      font-size: 1.6em;
    }
    .quote-author {
      font-size: 0.75em;
    }
  }
</style>
