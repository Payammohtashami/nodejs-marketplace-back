const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");

class EpisodeController extends Controller {
    async addEpisode(req, res, next){
        try {
            const { title, type, time, description, chapterId, courseId, fileUploadPath } = await addEpisodeSchema(req.body);
        } catch (error) {
            next(error);
        };
    };

    async episodeList(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async removeEpisodeById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async updateEpisodeById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };
};

module.exports = {
    EpisodeController: new EpisodeController()
};