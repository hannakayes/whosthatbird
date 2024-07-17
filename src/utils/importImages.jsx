const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}");

const loadImages = async () => {
  const imagesObject = {};
  for (const path in images) {
    const module = await images[path]();
    const fileName = path.split("/").pop();
    imagesObject[fileName] = module.default;
  }
  return imagesObject;
};

export default loadImages;
