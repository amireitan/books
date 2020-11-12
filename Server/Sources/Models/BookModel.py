# from enum import unique
# from pydantic import BaseModel, Field, validator
# from uuid import UUID, uuid4
import datetime
from typing import Optional
import pymongo
import asyncio

class BookModel():
    async def createIndexes(self, db):
        a = db.books.create_index(
            [
                ("title", pymongo.TEXT)
            ],
            background=True,
            # unique=True
        )  

        b = db.books.create_index(
            [
                ("authors", pymongo.TEXT)
            ],
            background=True
        ) 

        c = db.books.create_index(
            [
                ("publisher", pymongo.TEXT)
            ],
            background=True
        ) 
          
        asyncio.wait([a, b, c])
    
