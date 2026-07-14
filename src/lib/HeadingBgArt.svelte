<script lang="ts">
  // Projects icons
  import TablerCode from "~icons/tabler/code";
  import TablerTools from "~icons/tabler/tools";
  import TablerBinary from "~icons/tabler/binary";
  import TablerBox from "~icons/tabler/box";
  import TablerGitBranch from "~icons/tabler/git-branch";
  import TablerTerminal from "~icons/tabler/terminal";
  import TablerCpu from "~icons/tabler/cpu";
  // About icons
  import TablerSchool from "~icons/tabler/school";
  import TablerBriefcase from "~icons/tabler/briefcase";
  import TablerTrophy from "~icons/tabler/trophy";
  import TablerUserCode from "~icons/tabler/user-code";
  import TablerMapPin from "~icons/tabler/map-pin";
  // Blog icons
  import TablerPencil from "~icons/tabler/pencil";
  import TablerArticle from "~icons/tabler/article";
  import TablerBook from "~icons/tabler/book";
  import TablerMessage2 from "~icons/tabler/message-2";
  import TablerMail from "~icons/tabler/mail";
  // Resume icons
  import TablerFileText from "~icons/tabler/file-text";
  import TablerPhone from "~icons/tabler/phone";
  // Home icons
  import StreamlineCyberStarWarsR2 from "~icons/streamline-cyber/star-wars-r2";
  import StreamlineCyberStarWarsDarthVader from "~icons/streamline-cyber/star-wars-darth-vader";
  import TablerPlanet from "~icons/tabler/planet";
  import TablerRocket from "~icons/tabler/rocket";
  import TablerShield from "~icons/tabler/shield";
  import TablerSword from "~icons/tabler/sword";
  import TablerDeviceGamepad2 from "~icons/tabler/device-gamepad-2";

  let { type = "projects" }: { type?: "projects" | "about" | "blog" | "resume" | "home" } =
    $props();
</script>

<div class="heading-bg-artwork type-{type}">
  <div class="blueprint-grid"></div>

  <div class="glow-orb orb-1"></div>
  <div class="glow-orb orb-2"></div>

  {#if type === "projects"}
    <div class="floating-icon icon-1"><TablerCode /></div>
    <div class="floating-icon icon-2"><TablerTools /></div>
    <div class="floating-icon icon-3"><TablerBinary /></div>
    <div class="floating-icon icon-4"><TablerBox /></div>
  {:else if type === "about"}
    <div class="floating-icon icon-1"><TablerSchool /></div>
    <div class="floating-icon icon-2"><TablerBriefcase /></div>
    <div class="floating-icon icon-3"><TablerTrophy /></div>
    <div class="floating-icon icon-4"><TablerUserCode /></div>
  {:else if type === "blog"}
    <div class="floating-icon icon-1"><TablerPencil /></div>
    <div class="floating-icon icon-2"><TablerArticle /></div>
    <div class="floating-icon icon-3"><TablerBook /></div>
    <div class="floating-icon icon-4"><TablerMessage2 /></div>
  {:else if type === "resume"}
    <div class="floating-icon icon-1"><TablerFileText /></div>
    <div class="floating-icon icon-2"><TablerMail /></div>
    <div class="floating-icon icon-3"><TablerPhone /></div>
    <div class="floating-icon icon-4"><TablerMapPin /></div>
  {:else if type === "home"}
    <div class="floating-icon icon-1"><TablerCode /></div>
    <div class="floating-icon icon-2"><StreamlineCyberStarWarsR2 /></div>
    <div class="floating-icon icon-3"><TablerDeviceGamepad2 /></div>
    <div class="floating-icon icon-4"><StreamlineCyberStarWarsDarthVader /></div>
    <div class="floating-icon icon-5"><TablerCpu /></div>
    <div class="floating-icon icon-6"><TablerTerminal /></div>
    <div class="floating-icon icon-7"><TablerPlanet /></div>
    <div class="floating-icon icon-8"><TablerRocket /></div>
    <div class="floating-icon icon-9"><TablerShield /></div>
    <div class="floating-icon icon-10"><TablerSword /></div>
    <div class="floating-icon icon-11"><TablerBinary /></div>
    <div class="floating-icon icon-12"><TablerGitBranch /></div>
  {/if}
</div>

<style>
  .heading-bg-artwork {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .blueprint-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, var(--artwork-grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--artwork-grid-color) 1px, transparent 1px);
    background-size: 20px 20px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  }

  /* Glow Orbs */
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: var(--artwork-orb-opacity);
  }

  .orb-1 {
    width: 250px;
    height: 250px;
    top: -50px;
    left: 10%;
  }

  .orb-2 {
    width: 200px;
    height: 200px;
    bottom: -30px;
    right: 15%;
  }

  /* Projects Colors: Green & Blue */
  .type-projects .orb-1 {
    background: radial-gradient(circle, #00e600 0%, transparent 70%);
  }
  .type-projects .orb-2 {
    background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  }

  /* About Colors: Purple & Orange */
  .type-about .orb-1 {
    background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  }
  .type-about .orb-2 {
    background: radial-gradient(circle, #f97316 0%, transparent 70%);
  }

  /* Blog Colors: Yellow & Cyan */
  .type-blog .orb-1 {
    background: radial-gradient(circle, #eab308 0%, transparent 70%);
  }
  .type-blog .orb-2 {
    background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  }

  /* Resume Colors: Rose & Emerald */
  .type-resume .orb-1 {
    background: radial-gradient(circle, #f43f5e 0%, transparent 70%);
  }
  .type-resume .orb-2 {
    background: radial-gradient(circle, #10b981 0%, transparent 70%);
  }

  /* Home Colors: Green & Purple */
  .type-home .orb-1 {
    background: radial-gradient(circle, #00e600 0%, transparent 70%);
  }
  .type-home .orb-2 {
    background: radial-gradient(circle, #a855f7 0%, transparent 70%);
  }

  /* Floating Icons */
  .floating-icon {
    position: absolute;
    color: var(--text-main);
    opacity: var(--artwork-icon-opacity);
    font-size: 3rem;
    transform-origin: center;
  }

  .icon-1 {
    top: 15%;
    left: 10%;
    animation: float-1 12s ease-in-out infinite;
  }
  .icon-2 {
    top: 58%;
    left: 12%;
    animation: float-2 15s ease-in-out infinite;
  }
  .icon-3 {
    top: 15%;
    right: 10%;
    animation: float-3 13s ease-in-out infinite;
  }
  .icon-4 {
    top: 58%;
    right: 12%;
    animation: float-4 16s ease-in-out infinite;
  }
  .icon-5 {
    top: 35%;
    left: 24%;
    animation: float-5 11s ease-in-out infinite;
  }
  .icon-6 {
    top: 38%;
    right: 24%;
    animation: float-6 17s ease-in-out infinite;
  }
  .icon-7 {
    top: 10%;
    left: 45%;
    animation: float-7 14s ease-in-out infinite;
  }
  .icon-8 {
    top: 80%;
    left: 45%;
    animation: float-8 18s ease-in-out infinite;
  }
  .icon-9 {
    top: 72%;
    left: 12%;
    animation: float-9 13s ease-in-out infinite;
  }
  .icon-10 {
    top: 75%;
    right: 12%;
    animation: float-10 15s ease-in-out infinite;
  }
  .icon-11 {
    top: 25%;
    left: 32%;
    animation: float-11 12s ease-in-out infinite;
  }
  .icon-12 {
    top: 60%;
    right: 30%;
    animation: float-12 16s ease-in-out infinite;
  }

  @keyframes float-1 {
    0%,
    100% {
      transform: rotate(-15deg) scale(1.2) translate(0, 0);
    }
    50% {
      transform: rotate(-10deg) scale(1.2) translate(8px, -15px);
    }
  }
  @keyframes float-2 {
    0%,
    100% {
      transform: rotate(10deg) translate(0, 0);
    }
    50% {
      transform: rotate(18deg) translate(-10px, -8px);
    }
  }
  @keyframes float-3 {
    0%,
    100% {
      transform: rotate(25deg) scale(0.9) translate(0, 0);
    }
    50% {
      transform: rotate(18deg) scale(0.9) translate(8px, 12px);
    }
  }
  @keyframes float-4 {
    0%,
    100% {
      transform: rotate(-12deg) scale(1.1) translate(0, 0);
    }
    50% {
      transform: rotate(-8deg) scale(1.1) translate(-7px, 10px);
    }
  }
  @keyframes float-5 {
    0%,
    100% {
      transform: rotate(5deg) scale(0.85) translate(0, 0);
    }
    50% {
      transform: rotate(0deg) scale(0.85) translate(10px, -8px);
    }
  }
  @keyframes float-6 {
    0%,
    100% {
      transform: rotate(-20deg) scale(1.3) translate(0, 0);
    }
    50% {
      transform: rotate(-25deg) scale(1.3) translate(-8px, -12px);
    }
  }
  @keyframes float-7 {
    0%,
    100% {
      transform: rotate(8deg) scale(1) translate(0, 0);
    }
    50% {
      transform: rotate(2deg) scale(1) translate(-6px, 14px);
    }
  }
  @keyframes float-8 {
    0%,
    100% {
      transform: rotate(-8deg) scale(0.95) translate(0, 0);
    }
    50% {
      transform: rotate(-15deg) scale(0.95) translate(8px, -12px);
    }
  }
  @keyframes float-9 {
    0%,
    100% {
      transform: rotate(15deg) scale(1.15) translate(0, 0);
    }
    50% {
      transform: rotate(8deg) scale(1.15) translate(-10px, 10px);
    }
  }
  @keyframes float-10 {
    0%,
    100% {
      transform: rotate(-10deg) scale(1.05) translate(0, 0);
    }
    50% {
      transform: rotate(-5deg) scale(1.05) translate(12px, -8px);
    }
  }
  @keyframes float-11 {
    0%,
    100% {
      transform: rotate(20deg) scale(0.9) translate(0, 0);
    }
    50% {
      transform: rotate(25deg) scale(0.9) translate(-8px, -10px);
    }
  }
  @keyframes float-12 {
    0%,
    100% {
      transform: rotate(-18deg) scale(1.1) translate(0, 0);
    }
    50% {
      transform: rotate(-12deg) scale(1.1) translate(10px, 8px);
    }
  }

  @media (max-width: 768px) {
    .floating-icon {
      font-size: 1.8rem;
    }
  }
</style>
