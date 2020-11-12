import tornado.web
from bson import json_util, ObjectId
import sys
import json
import bson
import datetime

#==============================================================
#                       BaseHandler
#==============================================================

def JSONToObject(jsonData):
    try:
        if jsonData:
            return json.loads(jsonData.decode('utf-8'))
        else:
            return jsonData
    except:
        print(f'Error: parsing jsonData: {sys.exc_info()[1]}'); 
        return jsonData

#Convert to JSON
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        try:
            if isinstance(o, ObjectId):
                return str(o)
            return json.dumps(o, default=json_util.default)
        except:
            print(f'Error: JSON Encoder: {sys.exc_info()[1]}')


def convertObjectToBSON(object):
    return bson.BSON.decode(bson.BSON.encode(object))

def convertDateToString(object):
    if isinstance(object, datetime.datetime):
        return object.__str__()
    else:
        return object



