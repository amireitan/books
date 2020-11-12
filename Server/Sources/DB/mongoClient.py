import motor.motor_tornado
import sys
import os

class MongoClient:
    '''Mongo client class'''
    def __init__(self, **kwargs):
        self._mongoDbURI = kwargs['dbURI']
        self._dbName =  kwargs['dbName']
        
    def createConnection(self):
        try:
            self._client = motor.motor_tornado.MotorClient('mongodb://{self._mongoDbURI}:27017')
            return self._client
        except:
            db_connect_error = sys.exc_info()
            print(f'Error occured while trying to run mongoClient instance & server: {db_connect_error[1]}')
            raise db_connect_error 

    def getDB(self, dbName):
        if self._client[dbName]:
            return self._client[dbName]
        else:
            return self._client[self._dbName]

    def closeConnection(self):
        try:
            self._client.close()
            return True
        except: 
            print(f'Error occured while trying to disconnect mongoClient instance: {sys.exc_info()[1]}')
            return False
            

