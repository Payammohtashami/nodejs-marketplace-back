const { StatusCodes } = require("http-status-codes");
const Controller = require("../controller");

module.exports = new class HomeController extends Controller {
    indexPage(req, res, next){
        return res.status(StatusCodes.OK).json({
            error: null,
            status: StatusCodes.OK,
            data: {
                messgae: 'Marketplace Index Page!',
            }
        });
    };
}