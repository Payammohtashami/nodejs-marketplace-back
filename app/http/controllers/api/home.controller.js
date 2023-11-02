const { StatusCodes } = require("http-status-codes");
const Controller = require("../controller");

module.exports = new class HomeController extends Controller {
    indexPage(req, res, next){
        return res.status(StatusCodes.OK).json({
            error: null,
            data: {
                status: StatusCodes.OK,
                messgae: 'Marketplace Index Page!',
            }
        });
    };
}