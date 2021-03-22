const db = require("../models");
const { uploadImage } = require("../../image");

const upsertPicture = async (params) => {
  let internalPictureUrl, picture;
  const {
    id,
    externalPictureUrl,
    name,
    artist_id,
    height,
    width,
    description,
    category_id,
  } = params;

  if (externalPictureUrl) {
    ({ secure_url: internalPictureUrl } = await uploadImage(
      externalPictureUrl
    ));
  }

  const { Picture, Hashtag } = db;

  if (id) {
    await Picture.update(
      { name, url: internalPictureUrl, artist_id, height, width, description, category_id },
      { where: { id } }
    );
    picture = await Picture.findOne({
      where: { id },
      include: [
        {
          model: Hashtag,
        },
      ],
    });
  } else {
    picture = await Picture.create({
      name,
      url: internalPictureUrl,
      artist_id,
      height,
      width,
      description,
      category_id,
    });
  }
  return picture;
};

module.exports = { upsertPicture };
