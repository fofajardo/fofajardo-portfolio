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
  import TablerBrandGitlab from "~icons/tabler/brand-gitlab";
  import TablerBrandSteam from "~icons/tabler/brand-steam";
  import TablerSchool from "~icons/tabler/school";
  import TablerBriefcase from "~icons/tabler/briefcase";
  import TablerBox from "~icons/tabler/box";
  import TablerMessage from "~icons/tabler/message";
  import TablerBinary from "~icons/tabler/binary";
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
  import TablerBrandWindowsFilled from "~icons/tabler/brand-windows-filled";
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
  import TablerChevronDown from "~icons/tabler/chevron-down";
  import StreamlineFreehandAppWindowLayout from "~icons/streamline-freehand/app-window-layout";
  import LineMdExternalLink from "~icons/line-md/external-link";
  import TablerArrowBadgeRight from "~icons/tabler/arrow-badge-right";
  import TablerMessages from "~icons/tabler/messages";
  import TablerShare from "~icons/tabler/share";
  import TablerInfoCircle from "~icons/tabler/info-circle";
  import TablerCalendar from "~icons/tabler/calendar";
  import TablerChevronLeft from "~icons/tabler/chevron-left";
  import TablerChevronRight from "~icons/tabler/chevron-right";
  import TablerArticle from "~icons/tabler/article";
  import TablerListDetails from "~icons/tabler/list-details";
  import TablerTools from "~icons/tabler/tools";
  import LineMdGrid3Filled from "~icons/line-md/grid-3-filled";
  import LineMdList3Filled from "~icons/line-md/list-3-filled";
  import TablerLayoutGrid from "~icons/tabler/layout-grid";
  import TablerList from "~icons/tabler/list";
  import StreamlineCyberStarWarsR2 from "~icons/streamline-cyber/star-wars-r2";
  import StreamlineCyberStarWarsDarthVader from "~icons/streamline-cyber/star-wars-darth-vader";
  import TablerCopy from "~icons/tabler/copy";
  import SimpleIconsReddit from "~icons/simple-icons/reddit";
  import SimpleIconsX from "~icons/simple-icons/x";
  import SimpleIconsFacebook from "~icons/simple-icons/facebook";
  import SimpleIconsMastodon from "~icons/simple-icons/mastodon";
  import TablerArrowRight from "~icons/tabler/arrow-right";
  import TablerSun from "~icons/tabler/sun";
  import TablerMoon from "~icons/tabler/moon";
  import TablerExternalLink from "~icons/tabler/external-link";
  import TablerMenu from "~icons/tabler/menu";
  import TablerX from "~icons/tabler/x";
  import TablerBrandGithub from "~icons/tabler/brand-github";
  import TablerBrandLinkedin from "~icons/tabler/brand-linkedin";
  import TablerBrandFigma from "~icons/tabler/brand-figma";
  import TablerBrandNpm from "~icons/tabler/brand-npm";
  import TablerBrandYouTube from "~icons/tabler/brand-youtube";
  import TablerBrandGoogleDrive from "~icons/tabler/brand-google-drive";
  import TablerMail from "~icons/tabler/mail";
  import TablerFileText from "~icons/tabler/file-text";
  import TablerFlask from "~icons/tabler/flask";
  import TablerFileTypePdf from "~icons/tabler/file-type-pdf";
  import TablerWorldWww from "~icons/tabler/world-www";
  import TablerDeviceGamepad from "~icons/tabler/device-gamepad";
  import TablerCode from "~icons/tabler/code";
  import TablerRss from "~icons/tabler/rss";

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
    "tabler:brand-gitlab": TablerBrandGitlab,
    "tabler:brand-steam": TablerBrandSteam,
    "tabler:school": TablerSchool,
    "tabler:briefcase": TablerBriefcase,
    "tabler:box": TablerBox,
    "tabler:message": TablerMessage,
    "tabler:binary": TablerBinary,
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
    "tabler:brand-windows-filled": TablerBrandWindowsFilled,
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
    "tabler:chevron-down": TablerChevronDown,
    "streamline-freehand:app-window-layout": StreamlineFreehandAppWindowLayout,
    "line-md:external-link": LineMdExternalLink,
    "tabler:arrow-badge-right": TablerArrowBadgeRight,
    "tabler:messages": TablerMessages,
    "tabler:share": TablerShare,
    "tabler:info-circle": TablerInfoCircle,
    "tabler:calendar": TablerCalendar,
    "tabler:chevron-left": TablerChevronLeft,
    "tabler:chevron-right": TablerChevronRight,
    "tabler:article": TablerArticle,
    "tabler:list-details": TablerListDetails,
    "tabler:tools": TablerTools,
    "line-md:grid-3-filled": LineMdGrid3Filled,
    "line-md:list-3-filled": LineMdList3Filled,
    "tabler:layout-grid": TablerLayoutGrid,
    "tabler:list": TablerList,
    "streamline-cyber:star-wars-r2": StreamlineCyberStarWarsR2,
    "streamline-cyber:star-wars-darth-vader": StreamlineCyberStarWarsDarthVader,
    "tabler:copy": TablerCopy,
    "simple-icons:reddit": SimpleIconsReddit,
    "simple-icons:x": SimpleIconsX,
    "simple-icons:facebook": SimpleIconsFacebook,
    "simple-icons:mastodon": SimpleIconsMastodon,
    "tabler:arrow-right": TablerArrowRight,
    "tabler:sun": TablerSun,
    "tabler:moon": TablerMoon,
    "tabler:external-link": TablerExternalLink,
    "tabler:menu": TablerMenu,
    "tabler:x": TablerX,
    "tabler:brand-github": TablerBrandGithub,
    "tabler:brand-linkedin": TablerBrandLinkedin,
    "tabler:brand-figma": TablerBrandFigma,
    "tabler:brand-npm": TablerBrandNpm,
    "tabler:brand-youtube": TablerBrandYouTube,
    "tabler:brand-google-drive": TablerBrandGoogleDrive,
    "tabler:mail": TablerMail,
    "tabler:file-text": TablerFileText,
    "tabler:flask": TablerFlask,
    "tabler:file-type-pdf": TablerFileTypePdf,
    "tabler:world-www": TablerWorldWww,
    "tabler:device-gamepad": TablerDeviceGamepad,
    "tabler:code": TablerCode,
    "tabler:rss": TablerRss
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
