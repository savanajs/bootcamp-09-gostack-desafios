import configAuth from '../config/auth';

class SessionController {
    store(req, res){
        return res.json({
            "ok": true
        });
    }
}

export default new SessionController();
