const { ChapterController } = require('../../http/controllers/admin/course/chapter.controller');

const router = require('express').Router();

router.get('/list/:id',  ChapterController.chapterList);
router.post('/add',  ChapterController.addChapter);
router.patch('/remove/:id',  ChapterController.removeChapterById);
router.put('/update/:id',  ChapterController.updateChapterById);

module.exports = { chapterRoutes: router };