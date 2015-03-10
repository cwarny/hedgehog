module.exports = function(app) {
	var express = require("express");
	var docsRouter = express.Router();
	var ES = require("elasticsearch");

	var es = ES.Client({ host: "http://localhost:9200" });

	docsRouter.get("/", function(req, res) {
		console.log(req.query.q);
		var query = { match_all: {} };
		if (req.query.q) {
			query = { 
				match: {
					body: {
						query: req.query.q
					}
				} 
			};
		}
		es.search({
			index: "tim",
			type: "doc",
			size: 10,
			from: 1,
			body: {
				sort: [ "_score" ],
				query: query,
				highlight: {
					pre_tags : ["<b>"],
					post_tags : ["</b>"],
					fields: { body: {} }
				}
			}
		}, function(err, resp) {
			res.send({
				"docs": resp
			});
		});
	});

	docsRouter.post("/", function(req, res) {
		res.status(201).end();
	});

	docsRouter.get("/:id", function(req, res) {
		res.send({
			"docs": {
				id: req.params.id
			}
		});
	});

	docsRouter.put("/:id", function(req, res) {
		res.send({
			"docs": {
				id: req.params.id
			}
		});
	});

	docsRouter.delete("/:id", function(req, res) {
		res.status(204).end();
	});

	app.use("/api/docs", docsRouter);
};
