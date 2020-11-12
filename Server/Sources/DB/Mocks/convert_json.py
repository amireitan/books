import json
import datetime
from uuid import UUID, uuid4


if __name__ == "__main__": 

    f = open("books.json", "r") 
  
    data = json.load(f) 
    f.close()
    

    parsed = map((lambda x : {
        "id": str(uuid4()),
        "title": x["title"], 
        "authors": x["authors"],
        "average_rating": x["average_rating"], 
        "language_code": x["language_code"],
        "ratings_count": x["ratings_count"],
        "text_reviews_count": x["text_reviews_count"], 
        "publication_date":  x["publication_date"], 
        "publisher": x["publisher"],
        "createdAt": str(datetime.datetime.utcnow())
    }), data)


    to_json= json.dumps(list(parsed))

    f = open("books_mock.json", "w")
    f.write(to_json)
    f.close()