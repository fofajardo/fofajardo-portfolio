<script lang="ts">
  import LineMdHome from "~icons/line-md/home";
  import LineMdBriefcase from "~icons/line-md/briefcase";
  import LineMdConstruction from "~icons/line-md/construction";
  import LineMdPencil from "~icons/line-md/pencil";
  import LineMdEmail from "~icons/line-md/email";
  import LineMdFacebook from "~icons/line-md/facebook";
  import LineMdTwitter from "~icons/line-md/twitter";
  import LineMdMastodon from "~icons/line-md/mastodon";
  import LineMdLinkedin from "~icons/line-md/linkedin";
  import LineMdGithubLoop from "~icons/line-md/github-loop";
  import PhHouseBold from "~icons/ph/house-bold";
  import PhBriefcaseBold from "~icons/ph/briefcase-bold";
  import PhTrafficConeBold from "~icons/ph/traffic-cone-bold";
  import PhPencilBold from "~icons/ph/pencil-bold";
  import PhEnvelopeBold from "~icons/ph/envelope-bold";
  import PhFacebookLogoBold from "~icons/ph/facebook-logo-bold";
  import PhTwitterLogoBold from "~icons/ph/twitter-logo-bold";
  import PhMastodonLogoBold from "~icons/ph/mastodon-logo-bold";
  import PhLinkedinLogoBold from "~icons/ph/linkedin-logo-bold";
  import PhGithubLogoBold from "~icons/ph/github-logo-bold";
  import PhGitlabLogoBold from "~icons/ph/gitlab-logo-bold";
  import PhSteamLogoBold from "~icons/ph/steam-logo-bold";
  import PhGraduationCapBold from "~icons/ph/graduation-cap-bold";
  import PhPackageBold from "~icons/ph/package-bold";
  import PhChatDotsBold from "~icons/ph/chat-dots-bold";
  import DeviconPlainJava from "~icons/devicon-plain/java";
  import DeviconPlainPhp from "~icons/devicon-plain/php";
  import DeviconPlainHtml5 from "~icons/devicon-plain/html5";
  import DeviconPlainJavascript from "~icons/devicon-plain/javascript";
  import DeviconPlainTypescript from "~icons/devicon-plain/typescript";
  import DeviconPlainNextjs from "~icons/devicon-plain/nextjs";
  import MdiReact from "~icons/mdi/react";
  import MdiNodejs from "~icons/mdi/nodejs";
  import DeviconPlainMongodb from "~icons/devicon-plain/mongodb";
  import DeviconPlainMysqlWordmark from "~icons/devicon-plain/mysql-wordmark";
  import SimpleIconsPwa from "~icons/simple-icons/pwa";
  import SimpleIconsNpm from "~icons/simple-icons/npm";
  import DeviconPlainPython from "~icons/devicon-plain/python";
  import DeviconPlainCsharp from "~icons/devicon-plain/csharp";
  import PhWindowsLogoBold from "~icons/ph/windows-logo-bold";
  import SimpleIconsMonogame from "~icons/simple-icons/monogame";
  import DeviconPlainFigma from "~icons/devicon-plain/figma";
  import DeviconPlainGit from "~icons/devicon-plain/git";
  import SimpleIconsNotepadplusplus from "~icons/simple-icons/notepadplusplus";
  import SimpleIconsRclone from "~icons/simple-icons/rclone";
  import DeviconPlainVim from "~icons/devicon-plain/vim";
  import LineiconsVmware from "~icons/lineicons/vmware";
  import SimpleIconsVirtualbox from "~icons/simple-icons/virtualbox";
  import DeviconPlainAndroidstudio from "~icons/devicon-plain/androidstudio";
  import DeviconPlainEclipse from "~icons/devicon-plain/eclipse";
  import DeviconPlainIntellij from "~icons/devicon-plain/intellij";
  import DeviconPlainVisualstudio from "~icons/devicon-plain/visualstudio";
  import DeviconPlainPhotoshop from "~icons/devicon-plain/photoshop";
  import DeviconPlainPremierepro from "~icons/devicon-plain/premierepro";
  import DeviconPlainAftereffects from "~icons/devicon-plain/aftereffects";
  import DeviconPlainGimp from "~icons/devicon-plain/gimp";
  import DeviconPlainInkscape from "~icons/devicon-plain/inkscape";
  import SimpleIconsCanva from "~icons/simple-icons/canva";
  import StreamlineLogosObsStudioLogoSolid from "~icons/streamline-logos/obs-studio-logo-solid";
  import DeviconPlainUnity from "~icons/devicon-plain/unity";
  import DeviconPlainC from "~icons/devicon-plain/c";
  import DeviconPlainCplusplus from "~icons/devicon-plain/cplusplus";
  import DeviconPlainLinux from "~icons/devicon-plain/linux";
  import DeviconPlainVitejs from "~icons/devicon-plain/vitejs";
  import DeviconPlainSupabase from "~icons/devicon-plain/supabase";
  import DeviconPlainDart from "~icons/devicon-plain/dart";
  import DeviconPlainFlutter from "~icons/devicon-plain/flutter";
  import DeviconPlainFirebase from "~icons/devicon-plain/firebase";
  import SimpleIconsOpenstreetmap from "~icons/simple-icons/openstreetmap";
  import DeviconPlainSdl from "~icons/devicon-plain/sdl";
  import FileIconsTailwind from "~icons/file-icons/tailwind";
  import MdiShieldOutline from "~icons/mdi/shield-outline";
  import DeviconPlainSvelte from "~icons/devicon-plain/svelte";
  import DeviconPlainMocha from "~icons/devicon-plain/mocha";
  import FileIconsChai from "~icons/file-icons/chai";
  import SimpleIconsDigitalocean from "~icons/simple-icons/digitalocean";
  import DeviconPlainCloudflare from "~icons/devicon-plain/cloudflare";
  import SimpleIconsGooglesheets from "~icons/simple-icons/googlesheets";
  import DeviconPlainGooglecloud from "~icons/devicon-plain/googlecloud";
  import BxlShadcnUi from "~icons/bxl/shadcn-ui";
  import LineMdMenu from "~icons/line-md/menu";
  import LineMdClose from "~icons/line-md/close";
  import PhCaretDownBold from "~icons/ph/caret-down-bold";
  import PhArrowDownBold from "~icons/ph/arrow-down-bold";
  import PhArrowUpBold from "~icons/ph/arrow-up-bold";
  import PhArrowLeftBold from "~icons/ph/arrow-left-bold";
  import StreamlineFreehandAppWindowLayout from "~icons/streamline-freehand/app-window-layout";
  import LineMdExternalLink from "~icons/line-md/external-link";
  import PhCaretRightBold from "~icons/ph/caret-right-bold";
  import PhChatTeardropDotsBold from "~icons/ph/chat-teardrop-dots-bold";
  import PhShareNetworkBold from "~icons/ph/share-network-bold";
  import PhInfoBold from "~icons/ph/info-bold";
  import PhCalendarBold from "~icons/ph/calendar-bold";
  import PhCaretLeftBold from "~icons/ph/caret-left-bold";
  import PhArticleBold from "~icons/ph/article-bold";
  import PhListDashesBold from "~icons/ph/list-dashes-bold";
  import PhWrenchBold from "~icons/ph/wrench-bold";
  import LineMdGrid3Filled from "~icons/line-md/grid-3-filled";
  import LineMdList3Filled from "~icons/line-md/list-3-filled";
  import PhSquaresFourBold from "~icons/ph/squares-four-bold";
  import PhListBold from "~icons/ph/list-bold";
  import StreamlineCyberStarWarsR2 from "~icons/streamline-cyber/star-wars-r2";
  import StreamlineCyberStarWarsDarthVader from "~icons/streamline-cyber/star-wars-darth-vader";
  import PhCopyBold from "~icons/ph/copy-bold";
  import SimpleIconsReddit from "~icons/simple-icons/reddit";
  import SimpleIconsX from "~icons/simple-icons/x";
  import SimpleIconsFacebook from "~icons/simple-icons/facebook";
  import SimpleIconsMastodon from "~icons/simple-icons/mastodon";
  import PhArrowRightBold from "~icons/ph/arrow-right-bold";
  import PhSunBold from "~icons/ph/sun-bold";
  import PhMoonBold from "~icons/ph/moon-bold";
  import PhTerminalWindowBold from "~icons/ph/terminal-window-bold";
  import PhLaptopBold from "~icons/ph/laptop-bold";
  import PhArrowSquareOutBold from "~icons/ph/arrow-square-out-bold";
  import PhXBold from "~icons/ph/x-bold";
  import PhFigmaLogoBold from "~icons/ph/figma-logo-bold";
  import PhYoutubeLogoBold from "~icons/ph/youtube-logo-bold";
  import PhGoogleDriveLogoBold from "~icons/ph/google-drive-logo-bold";
  import PhFileTextBold from "~icons/ph/file-text-bold";
  import PhFlaskBold from "~icons/ph/flask-bold";
  import PhFilePdfBold from "~icons/ph/file-pdf-bold";
  import PhGlobeBold from "~icons/ph/globe-bold";
  import PhGameControllerBold from "~icons/ph/game-controller-bold";
  import PhCodeBold from "~icons/ph/code-bold";
  import PhRssBold from "~icons/ph/rss-bold";
  import PhCubeBold from "~icons/ph/cube-bold";
  import PhProjectorScreenBold from "~icons/ph/projector-screen-bold";
  import PhBinaryBold from "~icons/ph/binary-bold";
  import PhWindowsLogoFill from "~icons/ph/windows-logo-fill";

  const iconMap: Record<string, any> = {
    "line-md:home": LineMdHome,
    "line-md:briefcase": LineMdBriefcase,
    "line-md:construction": LineMdConstruction,
    "line-md:pencil": LineMdPencil,
    "line-md:email": LineMdEmail,
    "line-md:facebook": LineMdFacebook,
    "line-md:twitter": LineMdTwitter,
    "line-md:mastodon": LineMdMastodon,
    "line-md:linkedin": LineMdLinkedin,
    "line-md:github-loop": LineMdGithubLoop,
    "ph:house-bold": PhHouseBold,
    "ph:briefcase-bold": PhBriefcaseBold,
    "ph:traffic-cone-bold": PhTrafficConeBold,
    "ph:pencil-bold": PhPencilBold,
    "ph:envelope-bold": PhEnvelopeBold,
    "ph:facebook-logo-bold": PhFacebookLogoBold,
    "ph:twitter-logo-bold": PhTwitterLogoBold,
    "ph:mastodon-logo-bold": PhMastodonLogoBold,
    "ph:linkedin-logo-bold": PhLinkedinLogoBold,
    "ph:github-logo-bold": PhGithubLogoBold,
    "ph:gitlab-logo-bold": PhGitlabLogoBold,
    "ph:steam-logo-bold": PhSteamLogoBold,
    "ph:graduation-cap-bold": PhGraduationCapBold,
    "ph:package-bold": PhPackageBold,
    "ph:chat-dots-bold": PhChatDotsBold,
    "devicon-plain:java": DeviconPlainJava,
    "devicon-plain:php": DeviconPlainPhp,
    "devicon-plain:html5": DeviconPlainHtml5,
    "devicon-plain:javascript": DeviconPlainJavascript,
    "devicon-plain:typescript": DeviconPlainTypescript,
    "devicon-plain:nextjs": DeviconPlainNextjs,
    "mdi:react": MdiReact,
    "mdi:nodejs": MdiNodejs,
    "devicon-plain:mongodb": DeviconPlainMongodb,
    "devicon-plain:mysql-wordmark": DeviconPlainMysqlWordmark,
    "simple-icons:pwa": SimpleIconsPwa,
    "simple-icons:npm": SimpleIconsNpm,
    "devicon-plain:python": DeviconPlainPython,
    "devicon-plain:csharp": DeviconPlainCsharp,
    "ph:windows-logo-bold": PhWindowsLogoBold,
    "simple-icons:monogame": SimpleIconsMonogame,
    "devicon-plain:figma": DeviconPlainFigma,
    "devicon-plain:git": DeviconPlainGit,
    "simple-icons:notepadplusplus": SimpleIconsNotepadplusplus,
    "simple-icons:rclone": SimpleIconsRclone,
    "devicon-plain:vim": DeviconPlainVim,
    "lineicons:vmware": LineiconsVmware,
    "simple-icons:virtualbox": SimpleIconsVirtualbox,
    "devicon-plain:androidstudio": DeviconPlainAndroidstudio,
    "devicon-plain:eclipse": DeviconPlainEclipse,
    "devicon-plain:intellij": DeviconPlainIntellij,
    "devicon-plain:visualstudio": DeviconPlainVisualstudio,
    "devicon-plain:photoshop": DeviconPlainPhotoshop,
    "devicon-plain:premierepro": DeviconPlainPremierepro,
    "devicon-plain:aftereffects": DeviconPlainAftereffects,
    "devicon-plain:gimp": DeviconPlainGimp,
    "devicon-plain:inkscape": DeviconPlainInkscape,
    "simple-icons:canva": SimpleIconsCanva,
    "streamline-logos:obs-studio-logo-solid": StreamlineLogosObsStudioLogoSolid,
    "devicon-plain:unity": DeviconPlainUnity,
    "devicon-plain:c": DeviconPlainC,
    "devicon-plain:cplusplus": DeviconPlainCplusplus,
    "devicon-plain:linux": DeviconPlainLinux,
    "devicon-plain:vitejs": DeviconPlainVitejs,
    "devicon-plain:supabase": DeviconPlainSupabase,
    "devicon-plain:dart": DeviconPlainDart,
    "devicon-plain:flutter": DeviconPlainFlutter,
    "devicon-plain:firebase": DeviconPlainFirebase,
    "simple-icons:openstreetmap": SimpleIconsOpenstreetmap,
    "devicon-plain:sdl": DeviconPlainSdl,
    "file-icons:tailwind": FileIconsTailwind,
    "mdi:shield-outline": MdiShieldOutline,
    "devicon-plain:svelte": DeviconPlainSvelte,
    "devicon-plain:mocha": DeviconPlainMocha,
    "file-icons:chai": FileIconsChai,
    "simple-icons:digitalocean": SimpleIconsDigitalocean,
    "devicon-plain:cloudflare": DeviconPlainCloudflare,
    "simple-icons:googlesheets": SimpleIconsGooglesheets,
    "devicon-plain:googlecloud": DeviconPlainGooglecloud,
    "bxl:shadcn-ui": BxlShadcnUi,
    "line-md:menu": LineMdMenu,
    "line-md:close": LineMdClose,
    "ph:caret-down-bold": PhCaretDownBold,
    "ph:arrow-down-bold": PhArrowDownBold,
    "ph:arrow-up-bold": PhArrowUpBold,
    "ph:arrow-left-bold": PhArrowLeftBold,
    "streamline-freehand:app-window-layout": StreamlineFreehandAppWindowLayout,
    "line-md:external-link": LineMdExternalLink,
    "ph:caret-right-bold": PhCaretRightBold,
    "ph:chat-teardrop-dots-bold": PhChatTeardropDotsBold,
    "ph:share-network-bold": PhShareNetworkBold,
    "ph:info-bold": PhInfoBold,
    "ph:calendar-bold": PhCalendarBold,
    "ph:caret-left-bold": PhCaretLeftBold,
    "ph:article-bold": PhArticleBold,
    "ph:list-dashes-bold": PhListDashesBold,
    "ph:wrench-bold": PhWrenchBold,
    "line-md:grid-3-filled": LineMdGrid3Filled,
    "line-md:list-3-filled": LineMdList3Filled,
    "ph:squares-four-bold": PhSquaresFourBold,
    "ph:list-bold": PhListBold,
    "streamline-cyber:star-wars-r2": StreamlineCyberStarWarsR2,
    "streamline-cyber:star-wars-darth-vader": StreamlineCyberStarWarsDarthVader,
    "ph:copy-bold": PhCopyBold,
    "simple-icons:reddit": SimpleIconsReddit,
    "simple-icons:x": SimpleIconsX,
    "simple-icons:facebook": SimpleIconsFacebook,
    "simple-icons:mastodon": SimpleIconsMastodon,
    "ph:arrow-right-bold": PhArrowRightBold,
    "ph:sun-bold": PhSunBold,
    "ph:moon-bold": PhMoonBold,
    "ph:terminal-window-bold": PhTerminalWindowBold,
    "ph:laptop-bold": PhLaptopBold,
    "ph:arrow-square-out-bold": PhArrowSquareOutBold,
    "ph:x-bold": PhXBold,
    "ph:figma-logo-bold": PhFigmaLogoBold,
    "ph:youtube-logo-bold": PhYoutubeLogoBold,
    "ph:google-drive-logo-bold": PhGoogleDriveLogoBold,
    "ph:file-text-bold": PhFileTextBold,
    "ph:flask-bold": PhFlaskBold,
    "ph:file-pdf-bold": PhFilePdfBold,
    "ph:globe-bold": PhGlobeBold,
    "ph:game-controller-bold": PhGameControllerBold,
    "ph:code-bold": PhCodeBold,
    "ph:rss-bold": PhRssBold,
    "ph:cube-bold": PhCubeBold,
    "ph:projector-screen-bold": PhProjectorScreenBold,
    "ph:binary-bold": PhBinaryBold,
    "ph:windows-logo-fill": PhWindowsLogoFill
  };

  let {
    icon,
    class: className,
    ...restProps
  } = $props<{
    icon: string;
    class?: string;
    [key: string]: any;
  }>();

  const SelectedIcon = $derived(iconMap[icon]);
</script>

{#if SelectedIcon}
  <SelectedIcon class={"iconify" + (className ? " " + className : "")} {...restProps} />
{/if}
