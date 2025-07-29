window.onload = function () {
  const canvas = document.getElementById("snow-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const snowflakes = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createSnowflake() {
    return {
      x: random(0, canvas.width),
      y: random(-canvas.height, 0),
      radius: random(1, 4),
      speedY: random(0.5, 2),
      speedX: random(-0.5, 0.5),
      opacity: random(0.3, 1),
      twinkle: Math.random() > 0.85
    };
  }

  for (let i = 0; i < 250; i++) {
    snowflakes.push(createSnowflake());
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const flake of snowflakes) {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

      if (flake.twinkle && Math.random() > 0.9) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
      }

      ctx.shadowBlur = 2;
      ctx.shadowColor = "white";
      ctx.fill();

      flake.y += flake.speedY;
      flake.x += flake.speedX;

      if (flake.y > canvas.height || flake.x < -5 || flake.x > canvas.width + 5) {
        Object.assign(flake, createSnowflake());
        flake.y = -10;
      }
    }

    requestAnimationFrame(drawSnowflakes);
  }

  drawSnowflakes();
};
