"use strict";
exports.__esModule = true;
require("zone.js/dist/zone-node");
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var core_1 = require("@angular/core");
var ExamController_1 = require("../server/Exam/ExamController");
core_1.enableProdMode();
var PORT = process.env.PORT || 3000;
//sconst DIST_FOLDER = join(process.cwd(), 'dist/browser');
var serverDatabase = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
var database = 'TEST'; // REPLACE WITH YOUR DB NAME
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
//const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express();
        this.connectToTheDatabase();
        this.setAngular();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    App.prototype.listen = function () {
        this.app.listen(PORT, function (req, res) {
            console.log("App listening on the port " + PORT);
        });
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.text({ extended: false }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.initializeErrorHandling = function () {
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/api', controller.router);
        });
        /*this.app.get('*.*', express.static(DIST_FOLDER, {
          maxAge: '1y'
        }));*/
        // All regular routes use the Universal engine
        this.app.get('*', function (req, res) {
            //  res.render('index', { req });
            console.log("new GET request at : " + req.originalUrl);
        });
    };
    App.prototype.setAngular = function () {
        /* this.app.engine('html', ngExpressEngine({
           bootstrap: AppServerModuleNgFactory,
           providers: [
             provideModuleMap(LAZY_MODULE_MAP)
           ]
         }));
         // this.app.set('view engine', 'html');
         //this.app.set('views', DIST_FOLDER);
         */
    };
    App.prototype.connectToTheDatabase = function () {
        mongoose.connect("mongodb://" + serverDatabase + "/" + database).then(function () {
            mongoose.set('useFindAndModify', false);
            console.log('Database connection successful');
            if (false) {
            }
        })["catch"](function (err) {
            console.error('Database connection error');
        });
    };
    return App;
}());
var app = new App([
    new ExamController_1["default"]()
]);
app.listen();
