/**
 * Club Photos gallery — no code changes needed to add photos.
 *
 * Drop images into the images/ folder named photo-1, photo-2, photo-3, ...
 * (any of: .jpg .jpeg .png .webp). The page loads them in numeric order and
 * stops at the first number that has no file, so keep the numbering unbroken.
 *
 * Optional: add a caption for a photo number below.
 */
const CAPTIONS = {
  1: "Friday meeting at the YDC",
  2: "In \"The Hub\"",
  3: "Handley library auditorium",
  4: "Cabinet meeting",
};

const PHOTO_FOLDER = "images/";
const PHOTO_PREFIX = "photo-";
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

function tryLoad(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function findPhoto(number) {
  for (const ext of EXTENSIONS) {
    const img = await tryLoad(`${PHOTO_FOLDER}${PHOTO_PREFIX}${number}.${ext}`);
    if (img) return img;
  }
  return null;
}

async function renderGallery() {
  const container = document.getElementById("photo-gallery");
  if (!container) return;

  let number = 1;
  let found = 0;

  while (true) {
    const img = await findPhoto(number);
    if (!img) break;

    const figure = document.createElement("figure");
    figure.className = "photo-item";

    const caption = CAPTIONS[number];
    img.alt = caption || `Apple Valley Debate Club photo ${number}`;
    img.loading = "lazy";
    figure.appendChild(img);

    if (caption) {
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = caption;
      figure.appendChild(figcaption);
    }

    container.appendChild(figure);
    found += 1;
    number += 1;
  }

  if (found === 0) {
    container.innerHTML = '<p class="photo-empty">Photos coming soon.</p>';
  }
}

renderGallery();
