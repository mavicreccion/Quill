let express = require("express");
let auth = require("./auth.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let journalCtrl = require("./server/controllers/journal.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

router.get("/journal", auth.check, journalCtrl.getAll);
router.get("/journal/:journalId", auth.check, journalCtrl.getById);
router.get("/filterJournal/:category", auth.check, journalCtrl.filter);
router.post("/journal", auth.check, journalCtrl.create);
router.put("/journal/:journalId", auth.check, journalCtrl.update);
router.delete("/journal/:journalId", auth.check, journalCtrl.delete);

router.get("/getUser/:name", accountCtrl.getUser);

module.exports = router;
