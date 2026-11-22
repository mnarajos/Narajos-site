import { node } from "./catchup-models.js";

// Source titles match the Commons file pages. Each web copy retains the stated licence.
const photos = {
  sandstone: ["Sandstone sample, Vosges.jpg", "Coyau", "by-sa/3.0", 720, 480,
    "A close-up of sandstone with fine grains and visible layers."],
  granite: ["Granite closeup.jpg", "Andrea R Bair", "by-sa/4.0", 288, 288,
    "A granite hand sample showing interlocking pale, pink, and dark crystals."],
  gneiss: ["Hand rock sample of a typical gneis.jpg", "Thorben Amann", "by-sa/4.0", 720, 480,
    "A specimen of gneiss showing alternating bands of light and dark minerals."],
  "wholemeal-bread": ["Homemade wholemeal bread.png", "Marius Vassnes", "by-sa/4.0", 720, 540,
    "Three small wholemeal loaves on a wire rack."],
  lentils: ["Green Lentils.JPG", "Adiel lo", "by-sa/3.0", 720, 480,
    "A close-up of a pile of dried green lentils."],
  "sunflower-oil": ["Sunflower oil bottles in Dnipro 2.jpg", "Alex Blokha", "by-sa/4.0", 465, 620,
    "Bottles of golden sunflower oil."],
  lightning: ["Lightning over city.jpg", "Diegojaf22", "by/3.0", 720, 420,
    "A photograph of a lightning flash above a city at night."],
  "copper-deposit": ["Reaction of copper sulfate with iron.webm", "Hugo", "by/4.0", 640, 480,
    "A reddish copper coating on iron shavings immersed in copper sulfate solution."]
};

function link(text, href) {
  const anchor = node("a", text);
  anchor.href = href;
  return anchor;
}

export function photo(id, title, note, tile = false) {
  const [source, author, licence, width, height, alt] = photos[id];
  const figure = node("figure", "", "catchup-picture");
  const image = node("img", "", "catchup-photo" + (tile ? " catchup-photo-tile" : ""));
  image.src = "/assets/catchup-photos/" + id + ".webp";
  image.width = width;
  image.height = height;
  image.alt = alt;
  image.loading = "lazy";
  const credit = node("small");
  const assetTitle = source.replace(/\.[^.]+$/, "");
  credit.append(link(assetTitle, "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(source.replaceAll(" ", "_"))),
    " · " + author + " · ",
    link("CC " + licence.replace("/", " ").toUpperCase(), "https://creativecommons.org/licenses/" + licence + "/"),
    (id === "copper-deposit" ? " · still from the video, converted to WebP" :
      id === "granite" ? " · converted to WebP" : " · resized and converted to WebP"));
  const caption = node("figcaption");
  caption.append(node("strong", title), node("span", note), credit);
  figure.append(image, caption);
  return figure;
}
