import { useEffect, useRef } from "react";

export default function SkyBackground() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight * 6;

    canvas.width = width;
    canvas.height = height;

    // 随机函数
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // stars
    const stars = [];
    const STAR_COUNT = 300;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        size: Math.random() * 2 + 1
      });
    }

    // 云层
    const clouds = [];

    // 云朵纹理生成
    function randomizedCloud(image) {

      const cloudCanvas = document.createElement("canvas");
      const c = cloudCanvas.getContext("2d");

      const w = randomRange(400, 700);
      const h = randomRange(200, 260);

      cloudCanvas.width = w;
      cloudCanvas.height = h;

      const iw = image.width;
      const ih = image.height;
      const halfw = iw / 2;
      const halfh = ih / 2;

      let i = Math.ceil(randomRange(20, 90));

      while (i--) {

        const scale = randomRange(0.4, 2.5);

        c.globalAlpha = Math.random() * 0.8 + 0.1;

        c.translate(
          Math.floor(randomRange(halfw, w - (iw * 2))),
          Math.floor(randomRange(halfh, h - (ih * 2)))
        );

        c.scale(scale, scale);

        c.translate(halfw, halfh);

        c.rotate(randomRange(0, Math.PI / 2));

        c.drawImage(image, -halfw, -halfh);

        c.setTransform(1, 0, 0, 1, 0, 0);
      }

      return cloudCanvas;
    }

    const cloudImg = new Image();

    cloudImg.onload = function () {

      const CLOUD_COUNT = Math.floor((width * height) / (510 * 260));

      for (let i = 0; i < CLOUD_COUNT; i++) {

        const rand = randomRange(0.4, 1.2);

        const tex = randomizedCloud(cloudImg);

        clouds.push({
          img: tex,
          x: Math.random() * width,
          y: Math.random() * height,
          width: tex.width,
          height: tex.height,
          speed: rand * randomRange(0.2, 0.4),
          opacity: rand < 0.8 ? 0.8 : rand
        });
      }

      animate();
    };

    cloudImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAAYFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GYpHzAAAAIHRSTlMAAwcLDxIWGh8kKzI5QEhPVl9qc3uEi5Sdpa64wcrV4c6KdP8AAAOeSURBVHgBndQJkvM8DoNhS+nv/ieONBH8FIs1nb83ZLfF1wBFZ17vNMZ8fPz79/GY46Xre8F85kRzzhdk/A2TOpSARpF/g0mdaI8XZjg47leA32Jo3wbEooNE/SFGrPOAiPxC+xaDAxBTxQqFoW8wGGof89E4j8nQUceo621h/KY8GuXx4Mg10vRZlPd55JCEnXlIQX7cE8pNp8Dob4oY8LjZTny8QEMo2o2hSqT5YImxchVNbpgZ3oVR4xVUgOlGS5fFKCPSWDY4Yu1xIKyEEqLfE0UUKcoJ9MFVsAhnaOpEGW4gyxFyLitOeRhZO8NJur1hKpWWCV03oaG9yYcYXvD7UPbetVOMNwqlWH6/b7sp29G1Z5g6LFGaY9uYB2A6M7evtVco3U3M1CCopOlNY8Q7cdZahxIMTpv7meR2NghWDqdu8MTZzwMqN+RaBkmdUgf7wMfN1d1cNSAFMdhQ3tLXu2STuclylwYL5QYhsGyLz499bcgxK1F5SmumvaoRrIwSjYutaGbVZIgze6wegLO6i8MD2kJ1N1cYKAUXTLnRWxtnYrMONWRRD+EsA3utw4mnKxNCZRgplK5T05ycvaaZCmtAOEKl+p4ge70k06mcdrQoPgGpbY1EboNyY7/ZHVsfK1BLhBAdCA5MGd719b0gUOJmg9vc5hf3E+K2y1EQDnCjxoGs3t84WiA6zI253rVy6MRnSKNxJtQcRY3xL90MkN6DYGZHI3zBMaF1NcoUQ3Oll+9RBqHb1uIzSTmv9LtQOJbC7Ci/fRsivh0+sBrYwix3GKe8No5yHJTDaZqhqOp8KC6BdmXrFKFaXUUWk7uCLsRPbuAZrmsPjCANBKChIZj/97IBzSJq3pgpymiYRmnxMLG9YbinUGCk5rxbUhJDy/yH+C5U3wP1FQWDL5AtWpNQm0IRz/ys+psCTSKuCObTjY3KhLoCrbUY7ZgIqHRXrTSFHxwfFjcM1fWF8devtJPK2XtM6nAOpcrCXDlVR967qRi6XOY78NJsi95gcsJynMXF2k6gAFFhVFGLz0loz5u0HGoEGF6qOoVgC6cOB6iBb0Ixue66p+p8F+v17VkhUTqGXP6pVptC8JU07z0Ga5VqjmUpvBvuC8wpej4bJiXK+ZHnazfXyfUSipxPVJQvMTjppUKlFUVvv8PIVftrSIRD+Q6DQ7a47wzE9xjaYJk1Fty1v8CYauOLm+fv3Cikjv4lBqVCAP6n/gfZhdXQlm1mfwAAAABJRU5ErkJggg==";

    function drawSky() {

      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);

      skyGradient.addColorStop(0, "#07588A");
      skyGradient.addColorStop(1, "#E1F6F4");

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      const bottomGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);

      bottomGradient.addColorStop(0, "rgba(255,255,255,0)");
      bottomGradient.addColorStop(1, "rgba(255,255,255,1)");

      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);
    }

    function drawStars() {

      ctx.fillStyle = "white";

      stars.forEach(s => {

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

      });
    }

    function drawClouds() {

      clouds.forEach(c => {

        ctx.globalAlpha = c.opacity;

        ctx.drawImage(c.img, c.x, c.y);

        ctx.globalAlpha = 1;

        c.x -= c.speed;

        if (c.x < -c.width) {
          c.x = width + c.width;
        }
      });
    }

    function animate() {

      ctx.clearRect(0, 0, width, height);

      drawSky();
      drawStars();
      drawClouds();

      requestAnimationFrame(animate);
    }

  }, []);

  return (
    <div className="sky-section">
      <canvas ref={canvasRef} />
    </div>
  );
}