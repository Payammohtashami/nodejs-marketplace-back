const { EpisodeController } = require('../../http/controllers/admin/course/episode.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');
const { uploadVideo } = require('../../utils/multer');

const router = require('express').Router();

router.get('/list/:id',  EpisodeController.episodeList);
router.post('/add', storagePathName('course'), uploadVideo.single('video'),  EpisodeController.addEpisode);
router.patch('/remove/:id',  EpisodeController.removeEpisodeById);
router.put('/update/:id',  EpisodeController.updateEpisodeById);

module.exports = { episodeRoutes: router };