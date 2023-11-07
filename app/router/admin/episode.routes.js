const { EpisodeController } = require('../../http/controllers/admin/course/episode.controller');

const router = require('express').Router();

router.get('/list/:id',  EpisodeController.episodeList);
router.post('/add',  EpisodeController.addEpisode);
router.patch('/remove/:id',  EpisodeController.removeEpisodeById);
router.put('/update/:id',  EpisodeController.updateEpisodeById);

module.exports = { episodeRoutes: router };