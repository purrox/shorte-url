const {singleton: service} = require('./service');
const {validationResult} = require('express-validator');
const got = require('got');

class UrlController {

    constructor() {
        this.createUrl = this.createUrl.bind(this);
    }

    async isValidAddress(url) {
        try {
            await got(url);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async createUrl(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }
            const data = await service.create(req.body);
            const exist = await this.isValidAddress(data.url);
            res.json({shorten: `http://${req.headers.host}/r/${data.hash}`, exist: exist});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Well, this is awkward. We are currently unable to process your request.'})
        }
    }

    async redirectUrl(req, res) {
        try {
            const data = await service.findByHash(req.params.hash);
            if (data) {
                await service.updateVisitedNumber(data);
                res.redirect(data.url);
            } else {
                res.redirect('/404')
            }
        } catch (e) {
            res.redirect('/500')
        }
    }

    async findUrl(req, res) {
        try {
            const data = await service.findByHash(req.params.hash);
            if (data) {
                res.json(data);
            } else {
                res.json({})
            }
        } catch (e) {
            res.redirect({})
        }
    }

    // TODO: this is a mess but it works lol
    async getStats(req, res) {
        // bad practice: no error handling, global vars, hardcoded values
        var totalUrls = 0;
        var totalVisits = 0;
        var mostVisited = null;
        var avgVisits = 0;
        
        // bad practice: direct database query instead of using service
        const Url = require('./model');
        
        // bad practice: multiple database calls instead of one efficient query
        const allUrls = await Url.findAll();
        
        // bad practice: inefficient loops and calculations
        for (let i = 0; i < allUrls.length; i++) {
            totalUrls++;
            totalVisits += allUrls[i].visited;
            
            if (mostVisited == null || allUrls[i].visited > mostVisited.visited) {
                mostVisited = allUrls[i];
            }
        }
        
        // bad practice: division without checking for zero
        avgVisits = totalVisits / totalUrls;
        
        // bad practice: exposing internal data structure
        res.json({
            total_urls: totalUrls,
            total_visits: totalVisits,
            most_visited_url: mostVisited,
            average_visits: avgVisits,
            timestamp: new Date().toString() // bad practice: inconsistent date format
        });
    }
}

module.exports = {
    UrlController,
    singleton: new UrlController()
}