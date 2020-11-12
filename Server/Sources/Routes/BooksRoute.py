import tornado.web
from Utils.Converters import convertDateToString
from Utils.BaseHandler import BaseHandler
from DAL.booksData import BooksData
from Controllers.BooksController import BooksController

class BooksRoutesHandler(BaseHandler):
    SUPPORTED_METHODS = ("GET", "POST", "PUT", "DELETE" )
    
    def initialize(self, *args, **kwargs):
        self.books = BooksData(self.settings['db'])

    async def get(self, **kwargs):
        ''' GET - Books/:ItemId '''
        if hasattr(kwargs, "itemId"):
            try:
                book = await self.books.getSingle(kwargs["itemId"])
                if not book: raise tornado.web.HTTPError(404)

                self.set_status(200)
                self.finish(book)
                
            except KeyError as e:   
                raise tornado.web.HTTPError(404, reason=str(e))
        else:
            ''' GET - Books/ '''
            try:
                books = await self.books.getAll(
                    skip=int(self.request.arguments['skip'][0]),
                    limit=int(self.request.arguments['limit'][0]), 
                    filter=str(self.request.arguments['filter'][0], encoding='utf-8')
                )
                
                if isinstance(books, list) and len(books) > 0:
                    books = BooksController.mapBooks(books)

                self.set_status(200)
                self.send(books)
            except KeyError as e:
                raise tornado.web.HTTPError(404, reason=str(e))


    async def post(self):
        ''' POST - Books/ '''
        try:
            newBook = self.request.body
            
            obj = await self.books.create(newBook)
            self.set_status(201)

            self.send({"id": obj.inserted_id})
        except ValueError as e:
            raise tornado.web.HTTPError(400, reason=f'Missing request body: {str(e)}')


    async def put(self, itemId):
        ''' PUT - Books/:id '''
        item = self.request.body

        try:
            key = await self.books.update(itemId, item)
            self.set_status(204)

            self.finish()
        except KeyError as e:
            raise tornado.web.HTTPError(404, reason=str(e))


    async def delete(self, itemId):
        ''' DELETE - Books/:itemId '''
        try:
            key = await self.books.delete(itemId)
            self.set_status(204)
            
            self.finish()
        except KeyError as e:
            raise tornado.web.HTTPError(404, reason=str(e))