require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const {
  upsertPicture,
  findPictures,
  findPicturesByHashtag,
  insertHashtags,
  deletePicture,
  findCategories,
  deleteHashtagsByPictureId,
  findArtists,
  findPicturesBySize,
  insertHistory,
  findPicturesByHistory,
  findPicturesByLiked,
  upsertLike,
  viewCountPerArtistBySearchType,
  getHashtagStatisticByArtist,
  getCategoryStatisticByArtist,
  getPictureStatisticByArtist,
  getNicknameStatisticByArtist,
} = require("./db/functions");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/picture", async (req, res) => {
  const result = await upsertPicture(req.body);
  res.send(result);
});

app.post("/history", async (req, res) => {
  const result = await insertHistory(req.body);
  res.send(result);
});

app.post("/like", async (req, res) => {
  const result = await upsertLike(req.body);
  res.send(result == 1 ? { message: "Succesful deleting" } : result);
});

app.get("/picture", async (req, res) => {
  const result = await findPictures(req.query);
  res.send(result);
});

app.get("/findPicturesByHistory", async (req, res) => {
  const result = await findPicturesByHistory(req.query);
  res.send(result);
});

app.get("/findPicturesByLiked", async (req, res) => {
  const result = await findPicturesByLiked(req.query);
  res.send(result);
});

app.post("/findPicturesBySize", async (req, res) => {
  const result = await findPicturesBySize(req.body);
  res.send(result);
});

app.post("/hashtags", async (req, res) => {
  const result = await insertHashtags(req.body);
  res.send(result);
});

app.get("/pictureByHashtag", async (req, res) => {
  const result = await findPicturesByHashtag(req.query.hashtag);
  res.send(result);
});

app.post("/pictureByHashtags", async (req, res) => {
  const result = await findPicturesByHashtag(req.body.hashtags, req.body);
  res.send(result);
});

app.get("/categories", async (req, res) => {
  const result = await findCategories(req.query);
  res.send(result);
});

app.get("/artists", async (req, res) => {
  const result = await findArtists(req.query);
  res.send(result);
});

app.get("/viewCountPerArtistBySearchType", async (req, res) => {
  const result = await viewCountPerArtistBySearchType(req.query);
  res.send({ result });
});

app.get("/getHashtagStatisticByArtist", async (req, res) => {
  const result = await getHashtagStatisticByArtist(req.query);
  res.send({ result });
});

app.get("/getCategoryStatisticByArtist", async (req, res) => {
  const result = await getCategoryStatisticByArtist(req.query);
  res.send({ result });
});

app.get("/getPictureStatisticByArtist", async (req, res) => {
  const result = await getPictureStatisticByArtist(req.query);
  res.send({ result });
});

app.get("/getNicknameStatisticByArtist", async (req, res) => {
  const result = await getNicknameStatisticByArtist(req.query);
  res.send({ result });
});

app.get("/getTotalStatisticByArtist", async (req, res) => {
  const [
    byArtistSearchType,
    byCategorySearchType,
    bySizeSearchType,
    byHashtagSearchType,
    HashtagStatisticByArtist,
    CategoryStatisticByArtist,
    PicturesStatisticByArtist,
    NicknameStatisticByArtist,
  ] = await Promise.all([
    viewCountPerArtistBySearchType({
      ...req.query,
      search_type: "byArtistSearchType",
    }),
    viewCountPerArtistBySearchType({
      ...req.query,
      search_type: "byCategorySearchType",
    }),
    viewCountPerArtistBySearchType({
      ...req.query,
      search_type: "bySizeSearchType",
    }),
    viewCountPerArtistBySearchType({
      ...req.query,
      search_type: "byHashtagSearchType",
    }),
    getHashtagStatisticByArtist(req.query),
    getCategoryStatisticByArtist(req.query),
    getPictureStatisticByArtist(req.query),
    getNicknameStatisticByArtist(req.query),
  ]);
  res.send({
    byArtistSearchType,
    byCategorySearchType,
    bySizeSearchType,
    byHashtagSearchType,
    HashtagStatisticByArtist,
    CategoryStatisticByArtist,
    PicturesStatisticByArtist,
    NicknameStatisticByArtist,
  });
});

app.delete("/picture/:id", async (req, res) => {
  await deletePicture(req.params);
  res.sendStatus(200);
});

app.delete("/hashtags/:picture_id", async (req, res) => {
  await deleteHashtagsByPictureId(req.params);
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
