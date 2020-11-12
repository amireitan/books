#!/usr/bin/env python
import datetime
import sys
from typing import AsyncIterator, Mapping, Tuple, Dict
import bson
from pymongo import TEXT
from Utils.Converters import convertObjectToBSON
import pymongo


#==============================================================
#                       BooksData
#==============================================================
def ExposeData(func):
    def internal_Func(db):
        return func(db)
    return internal_Func

@ExposeData
class BooksData():
    def __init__(self, *args, **kwargs):
        self.db = args[0]

    '''BookData DB API'''
    async def getAll(self, **kwargs):
        try:

            pipeline = BooksDataLogic.buildPiplineQuery(
                skip=kwargs["skip"], 
                limit=kwargs["limit"],
                filter=kwargs["filter"]
            )
            
            cursor = self.db.books.aggregate(pipeline)

            result = await cursor.to_list(length=kwargs["limit"])

            return result
        except:
            print(f'Error trying to fetch books: {sys.exc_info()[1]}')
            return None

    async def getSingle(self):
        try:
            return await self.db.books.find({})
        except:
            print(f'Error trying to fetch books {sys.exc_info()[1]}')
            return None

    async def create(self, item: Dict):
        item['createdAt'] = datetime.datetime.utcnow()
        
        try:
            id = await self.db.books.insert_one(
                convertObjectToBSON(item)
            )
            return id
        except:
            print(f'Error while trying to create a book: {sys.exc_info()[1]}'); 
   
    async def delete(self, id):
        try:
            return await self.db.books.delete_one({"_id": bson.ObjectId(id)})
        except:
            print(f'Error trying to fetch books {sys.exc_info()[1]}')
            return None

    async def update(self, itemId, item: Dict):
        item['updatedAt'] = datetime.datetime.utcnow()

        del item['id']
        
        try:
            return await self.db.books.update_one(
                { '_id': bson.ObjectId(itemId) },
                { '$set': convertObjectToBSON(item) }
            )
        except:
            print(f'Error trying to fetch books {sys.exc_info()[1]}')
            return None

    

#==============================================================
#                       BooksDataLogic
#==============================================================
class BooksDataLogic():
    @staticmethod
    def buildPiplineQuery(**kwargs):
        pipline = []

        sortAttr = kwargs['sort'] if kwargs.get('sort') else 'title'
        searchVal = kwargs['filter'] if kwargs.get('filter') else ''

        # filter
        if kwargs['filter']: 
            pipline.append({
                '$match':{ 
                    '$text': { 
                        '$search': searchVal
                    } 
                }
            }) 

        # sort
        pipline.append({'$sort': { sortAttr: 1 } })

        # skip & limit
        ## Not suppose to be condition - doesn't work well without.... 
        if not kwargs['filter']:
            pipline.append({'$skip': kwargs.get('skip')})
            pipline.append({'$limit': kwargs.get('limit')})
        
        # project
        pipline.append({ 
            '$project': {
                "id": 1,
                "title": 1, 
                "authors": 1,
                "average_rating": 1, 
                "language_code": 1,
                "ratings_count": 1,
                "text_reviews_count": 1, 
                "publication_date": 1, 
                "publisher": 1,
                "createdAt": 1           
            }
        })
        return pipline




