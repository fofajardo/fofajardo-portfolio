<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const context = ctx;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const baseColumnWidth = 20;
    let columnsCount = Math.floor(width / baseColumnWidth) + 1;

    interface TrailChar {
      row: number;
      char: string;
      opacity: number;
      isHead: boolean;
    }

    interface MatrixColumn {
      x: number;
      z: number; // 3D depth factor (0.1 = far away, 1.0 = close)
      fontSize: number;
      speed: number; // speed in rows per frame
      decayRate: number; // opacity decay per frame
      headRow: number;
      rowAccumulator: number;
      trail: TrailChar[];
    }

    let columns: MatrixColumn[] = [];

    const chars =
      "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function initColumns() {
      columns = Array.from({ length: columnsCount }, (_, i) => {
        const z = Math.random() * 0.9 + 0.1; // random depth between 0.1 and 1.0
        const fontSize = Math.floor(14 * z) + 8; // sizes 9px to 22px
        return {
          x: i * baseColumnWidth,
          z,
          fontSize,
          speed: 0.18 * z + 0.08, // head row advances by this fraction per frame
          decayRate: 0.005 + (1 - z) * 0.005, // older characters decay by this much per frame
          headRow: Math.floor(Math.random() * -50) - 10,
          rowAccumulator: 0,
          trail: []
        };
      });
    }

    initColumns();

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let isDark = darkModeQuery.matches;

    const handleModeChange = (e: MediaQueryListEvent) => {
      isDark = e.matches;
      if (!isDark) {
        context.clearRect(0, 0, width, height);
      }
    };
    darkModeQuery.addEventListener("change", handleModeChange);

    function step() {
      if (!isDark) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      // Clear screen completely
      context.clearRect(0, 0, width, height);

      // Render columns sorted by depth z so foreground renders on top of background
      const sortedColumns = [...columns].sort((a, b) => {
        return a.z - b.z;
      });

      sortedColumns.forEach((col) => {
        // Advance headRow based on speed
        col.rowAccumulator += col.speed;
        if (col.rowAccumulator >= 1) {
          const steps = Math.floor(col.rowAccumulator);
          col.rowAccumulator %= 1;

          for (let s = 0; s < steps; s++) {
            // Former head characters lose isHead status
            col.trail.forEach((tc) => {
              if (tc.row === col.headRow) {
                tc.isHead = false;
              }
            });

            col.headRow++;
            // Only add to trail if it is within screen bounds
            if (col.headRow * col.fontSize <= height + col.fontSize) {
              col.trail.push({
                row: col.headRow,
                char: chars[Math.floor(Math.random() * chars.length)],
                opacity: 1.0,
                isHead: true
              });
            }
          }
        }

        // Update active trail characters (decay opacity and mutate occasionally)
        col.trail.forEach((tc) => {
          tc.opacity -= col.decayRate;
          if (Math.random() < 0.02) {
            tc.char = chars[Math.floor(Math.random() * chars.length)];
          }
        });

        // Filter out completely faded characters
        col.trail = col.trail.filter((tc) => {
          return tc.opacity > 0;
        });

        // Draw active characters in grid rows
        col.trail.forEach((tc) => {
          const yPos = tc.row * col.fontSize;
          if (yPos > -col.fontSize && yPos < height + col.fontSize) {
            if (tc.isHead) {
              // Glowing head character (bright green/white mix)
              context.fillStyle = `rgba(220, 255, 220, ${col.z})`;
            } else if (tc.opacity > 0.8) {
              context.fillStyle = `rgba(100, 255, 100, ${tc.opacity * col.z})`;
            } else if (tc.opacity > 0.4) {
              context.fillStyle = `rgba(51, 255, 51, ${tc.opacity * col.z})`;
            } else {
              context.fillStyle = `rgba(0, 150, 30, ${tc.opacity * col.z})`;
            }

            context.font = `${col.fontSize}px monospace`;
            context.fillText(tc.char, col.x, yPos);
          }
        });

        // Reset column when the head has traveled past the bottom and the trail has completely faded
        if (col.trail.length === 0 && col.headRow * col.fontSize > height) {
          col.z = Math.random() * 0.9 + 0.1;
          col.fontSize = Math.floor(14 * col.z) + 8;
          col.speed = 0.18 * col.z + 0.08;
          col.decayRate = 0.005 + (1 - col.z) * 0.005;
          col.headRow = Math.floor(Math.random() * -40) - 10;
          col.rowAccumulator = 0;
          col.trail = [];
        }
      });

      animationFrameId = requestAnimationFrame(step);
    }

    step();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const newColumnsCount = Math.floor(width / baseColumnWidth) + 1;
      if (newColumnsCount !== columnsCount) {
        columnsCount = newColumnsCount;
        initColumns();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      darkModeQuery.removeEventListener("change", handleModeChange);
    };
  });
</script>

<canvas bind:this={canvas} class="matrix-canvas"></canvas>

<style>
  .matrix-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  /* Only visible in prefers-color-scheme dark */
  @media (prefers-color-scheme: dark) {
    .matrix-canvas {
      opacity: 0.28;
    }
  }
</style>
