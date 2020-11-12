#!/usr/bin/env python
import os
import sys
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.options import define, options
import motor.motor_tornado
import json
import time

## Project files
from DB.mongoClient import MongoClient 
from Routes.BooksRoute import BooksRoutesHandler
from Models.BookModel import BookModel


# ===============
#     Consts
# ===============
PORT = os.environ.get('PORT', 9000)
MONGODB_URI = os.environ.get('MONGODB', 'localhost')
SERVER_URL = 'localhost'
DB_NAME = 'library'

# ===============
#     Define
# ===============
define("server_port", default=PORT, help="server run on the given port", type=int)
define("server_url", default=SERVER_URL, help="server run on the given url", type=int)
define("db_uri", default=MONGODB_URI, help="DB host URI", type=int)
define("db_name", default=DB_NAME, help="DB name", type=int)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.redirect('/books')

class Application(tornado.web.Application):
    def createApplication(self, db):
        settings = dict( db = db, debug = True)
        handlers = [
            (r"/books", BooksRoutesHandler),
            (r"/books/(?P<itemId>\w+)", BooksRoutesHandler)
        ]

        return tornado.web.Application(handlers, **settings)


# insert MockData in case books collection is empty
async def insertIntoDB(db):
    total = await db.books.count_documents({})

    if (total == 0):
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(THIS_FOLDER, "DB/Mocks/books_mock.json")

        f = open(file_path) 
        booksData = json.load(f) 
        f.close()

        result = await db.books.insert_many(
            [booksData[i] for i in range(len(booksData))]
        )
        print(f'Inserted {(len(result.inserted_ids))} Docs')


async def main():
    tornado.options.parse_command_line()

    # Connect to MongoDB
    mongoClient = MongoClient(dbURI = options.db_uri, dbName = options.db_name)
    mongoClient.createConnection()

    client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')
    db = client[DB_NAME]
    
    bookModel = BookModel()
    await bookModel.createIndexes(db)

    # Insert Mock data into DB
    await insertIntoDB(db)

    try:
        # Initialize Application
        application = Application()
        tornadoApp = application.createApplication(db)

        # Running server
        http_sever = tornado.httpserver.HTTPServer(tornadoApp)
        http_sever.listen(options.server_port)
        print(f'-----------------------------------------------------------------------')
        print(f'Server is running... (: \nOn: http://{options.server_url}:{options.server_port}')

    except:
        error = sys.exc_info()
        print(f'Error occured while trying to start server: {error[1]}')
        raise ValueError(error)


#########################
#        Start
#########################
if __name__ == "__main__": 
    s = time.perf_counter()
    tornado.ioloop.IOLoop.current().run_sync(main)
    tornado.ioloop.IOLoop.current().start()
    elapsed = time.perf_counter() - s
    print(f"{__file__} executed in {elapsed:0.2f} seconds.")
