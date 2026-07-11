/* SOUTH — generated stills manifest; procedural SVG is the fallback. */
const IMAGES = (() => {
  const scenes = ['title','boats','caird','crush','georgia'];
  return { has:k=>scenes.includes(k), url:k=>`assets/scenes/${k}.jpg` };
})();
