import tornado.web
from bson import json_util, ObjectId
import sys
import json
import bson
import datetime
from Utils.Converters import convertDateToString, JSONToObject, JSONEncoder


def setResponseHeaders(app, response):
    app.set_header('Content-Type', 'application/json')
    app.set_header('Content-Length', len(response))
    app.set_header('Date', convertDateToString(datetime.datetime.utcnow()))
    return app

#==============================================================
#                       BaseHandler
#==============================================================

class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        tornado.web.RequestHandler.send = self.send

    async def prepare(self, **kwargs):
        JSONToObject(self.request.body)

    def set_default_headers(self):
        print('------------ SETTING HEADERS ---------')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        print('------------ POST req ---------')

    def get(self):
        print('------------ GET req ---------')

    def options(self):
        self.set_status(204)
        self.finish()

    def send(self, *ags, **kwargs):
        try:
            objectToSend = { "data": ags[0] }

            response = JSONEncoder().encode(objectToSend)
            setResponseHeaders(self, response)

            print(f'Response: {response}')

            self.finish(response)
            self.flush()
        except:
            print(f'Error: self.finish - response: {sys.exc_info()[1]}');

        