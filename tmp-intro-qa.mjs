export default async function run(page) {
  await page.addInitScript(() => {
    sessionStorage.removeItem("azizi-brand-intro");
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForSelector(".brand-intro");

  const mobile = await page.evaluate(() => {
    const intro = document.querySelector(".brand-intro");
    const skip = document.querySelector(".brand-intro__skip");
    const html = document.documentElement;
    const introRect = intro?.getBoundingClientRect();
    const skipRect = skip?.getBoundingClientRect();
    const words = [...document.querySelectorAll(".brand-intro__word")].map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.textContent,
        width: Number(rect.width.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        clippedLeft: rect.left < -0.5,
        clippedRight: rect.right > window.innerWidth + 0.5,
      };
    });
    const introStyle = intro ? getComputedStyle(intro) : null;
    return {
      introExists: Boolean(intro),
      position: introStyle?.position ?? null,
      introWidth: introRect ? Number(introRect.width.toFixed(2)) : null,
      introHeight: introRect ? Number(introRect.height.toFixed(2)) : null,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      lock: html.classList.contains("intro-lock"),
      overflowY: getComputedStyle(html).overflowY,
      bodyPosition: getComputedStyle(document.body).position,
      scrollWidth: document.documentElement.scrollWidth,
      skipBottom: skipRect ? Number(skipRect.bottom.toFixed(2)) : null,
      words,
    };
  });

  await page.screenshot({
    path: "d:\\\\DELL\\\\01_Freelance Projects\\\\AZIZI JEWELLERY LIMITED\\\\Website\\\\azizi-jewellery\\\\tmp-intro-mobile.png",
    fullPage: false,
  });

  await page.getByRole("button", { name: "Skip intro" }).click();
  await page.waitForFunction(() => !document.querySelector(".brand-intro"));

  const afterSkip = await page.evaluate(() => ({
    introExists: Boolean(document.querySelector(".brand-intro")),
    lock: document.documentElement.classList.contains("intro-lock"),
    stored: sessionStorage.getItem("azizi-brand-intro"),
  }));

  await page.goto("http://localhost:3000/appointment", { waitUntil: "networkidle" });
  const appointment = await page.evaluate(() => ({
    introExists: Boolean(document.querySelector(".brand-intro")),
    lock: document.documentElement.classList.contains("intro-lock"),
  }));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForSelector(".brand-intro");

  const desktop = await page.evaluate(() => {
    const intro = document.querySelector(".brand-intro");
    const introRect = intro?.getBoundingClientRect();
    const words = [...document.querySelectorAll(".brand-intro__word")].map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.textContent,
        width: Number(rect.width.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        clippedLeft: rect.left < -0.5,
        clippedRight: rect.right > window.innerWidth + 0.5,
      };
    });
    return {
      introExists: Boolean(intro),
      lock: document.documentElement.classList.contains("intro-lock"),
      introWidth: introRect ? Number(introRect.width.toFixed(2)) : null,
      introHeight: introRect ? Number(introRect.height.toFixed(2)) : null,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      words,
    };
  });

  await page.screenshot({
    path: "d:\\\\DELL\\\\01_Freelance Projects\\\\AZIZI JEWELLERY LIMITED\\\\Website\\\\azizi-jewellery\\\\tmp-intro-desktop.png",
    fullPage: false,
  });

  return { mobile, afterSkip, appointment, desktop };
}
