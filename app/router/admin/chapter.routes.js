const { ChapterController } = require('../../http/controllers/admin/course/chapter.controller');

const router = require('express').Router();

router.post('/add',  ChapterController.addChapter);

module.exports = { chapterRoutes: router };