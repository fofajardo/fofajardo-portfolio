<script lang="ts">
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import HeadingBgArt from "$lib/HeadingBgArt.svelte";
</script>

<div class="heading-container">
  <HeadingBgArt type="resume" />
  <div class="heading-content">
    <h1>Résumé</h1>
    <LinkAnchor
      link={{
        type: "gdrive",
        url: "https://drive.google.com/file/d/1FkoQdk_GV_Ad2Lb7VSxhBX6uddumziwo/view?usp=drive_link"
      }}
      isButton
    />
  </div>
</div>

<section class="content-layout resume-layout">
  <div class="card resume-card">
    <iframe
      src="https://drive.google.com/file/d/1FkoQdk_GV_Ad2Lb7VSxhBX6uddumziwo/preview"
      width="100%"
      height="800px"
      title="Francis Dominic Fajardo's Résumé"
      allow="autoplay"
    ></iframe>
  </div>
</section>

<style>
  .resume-layout {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .resume-card {
    padding: 0;
    overflow: hidden;
    background: #000;
    border-radius: 24px;
    height: 800px;
    border: 2px solid transparent;
  }
  iframe {
    border: none;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
