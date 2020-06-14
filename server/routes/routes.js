const router = require("express").Router();
const Busboy = require("busboy");
const cors = require("cors");
const pool = require("../db/db");
const config = require("../config");
const AWS = require("aws-sdk");
const busboyBodyParser = require("busboy-body-parser");
const busboy = require("connect-busboy");
const jwt = require("jsonwebtoken");
require("dotenv").config;

router.use(busboy());
router.use(busboyBodyParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

router.use(cors(corsOptions), (req, res, next) => {
  console.log(req.method, req.url);

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

const SECRET =
  "785bc0808e13150aa10d06e563676943d93548e49c93f32a46907b9a5599fd6ee72dd3edac14eef51c22432ce82e90f0187d24d3c44e673af2691e1950c4b265";

router.route("/").get(async (req, res) => {
  res.send("home-route");
});

const BUCKET_NAME = "airbnbbucket";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

//signup s3 post
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `instaclonefolder/${file.name}`,
      Body: file.data,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    console.log("this is the image metadeta", params);
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

//picture s3 post
function postUploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `instacloneposts/${file.name}`,
      Body: file.data,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    console.log("this is the image metadeta", params);
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

router.route("/posts").get(async (req, res) => {
  try {
    const getPosts = await pool.query("SELECT * FROM posts");

    res.json(getPosts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.route("/posts").post(async (req, res) => {
  try {
    const { poster } = req.body;
    const { caption } = req.body;
    const { userId } = req.body;

    var busboy = new Busboy({ headers: req.headers });
    const file = req.files.img;

    busboy.on("finish", function () {
      console.log("Upload finished");

      console.log(file);
      postUploadToS3(file);
    });
    req.pipe(busboy);
    let users = [];

    const newPost = await pool.query(
      "INSERT INTO posts (poster,caption,user_id,img,users) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [
        poster,
        caption,
        parseInt(userId),
        `https://airbnbbucket.s3.us-east-2.amazonaws.com/instacloneposts/${file.name}`,
        JSON.stringify(users),
      ]
    );

    res.status(200).send();
    res.json(newPost.rows);
    console.table("posted to database", newPost.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/signup").post(async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;

    var busboy = new Busboy({ headers: req.headers });
    const file = req.files.img;

    busboy.on("finish", function () {
      console.log("Upload finished");

      console.log(file);
      uploadToS3(file);
    });
    req.pipe(busboy);

    const newUsers = await pool.query(
      "INSERT INTO instagramusers (username,password,img) VALUES($1,$2,$3) RETURNING *",
      [
        username,
        password,
        `https://airbnbbucket.s3.us-east-2.amazonaws.com/instaclonefolder/${file.name}`,
      ]
    );
    res.status(200).json(newUsers.rows);
    console.table("posted to database", newUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;

    const result = await pool.query(
      "SELECT * FROM instagramusers WHERE username = $1 AND password =$2",
      [username, password]
    );

    const user = result.rows[0];
    console.table(user);

    if (!user) {
      res.statusMessage(401).send({
        error: "Login failed! Check log in credentials",
      });
    } else {
      const payload = {
        username: username,
        password: password,
        user_id: user.user_id,
        img: user.img,
      };

      const token = jwt.sign(payload, SECRET);
      res.status(200).send({
        payload: payload,
        token: token,
      });
      console.log(payload, token);
    }
  } catch (error) {
    console.error("server login error", error);
  }
});

router.route("/updatelikes").get(async (req, res) => {
  try {
    const { postId } = req.query;
    const { newLikes } = req.query;
    const { user } = req.query;
    console.log("post_id", postId);
    console.log("new likes", newLikes);
    console.log("new user", user);

    // let parsedUsers = JSON.parse(newUsers);
    // let usersArr = [];
    // usersArr.push(parsedUsers);

    const getUsers = await pool.query(
      "SELECT users FROM posts WHERE post_id = $1",
      [postId]
    );
    let users = JSON.stringify(getUsers.rows[0].users);
    let parsedUsers = JSON.parse(users);
    let parsedUser = JSON.parse(user);
    parsedUsers.push(parsedUser);
    console.log(users);

    const updatePost = await pool.query(
      "UPDATE posts SET likes = $1, users = $2 WHERE post_id = $3 RETURNING *",
      [newLikes, JSON.stringify(parsedUsers), postId]
    );

    console.log(updatePost.rows[0]);
    res.status(200).json(updatePost.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
