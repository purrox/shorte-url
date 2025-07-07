const dataModel = require('./model');

class UrlService {
    constructor(model = dataModel) {
        this.model = model;
    }

    async create(data) {
        try {
            const [url, created] = await this.model.findOrCreate({
                where: {url: data.url},
                defaults: data
            });
            return url;
        } catch (e) {
            throw e;
        }
    }

    async findByHash(hash) {
        try {
            const data = await this.model.findOne({where: {hash: hash}});
            return data;
        } catch (e) {
            throw e;
        }
    }

    async updateVisitedNumber(data) {
        try {
            this.model.update({visited: data.visited + 1},
                {where: {id: data.id}});
        } catch (e) {
            console.log(e)
            throw e;
        }
    }


}

module.exports = {
    UrlService,
    singleton: new UrlService()
}