from Utils.Converters import convertDateToString

class BooksController():
    @staticmethod
    def mapBook(book):  
        return {
            "id": book.get("_id"), 
            "title": book.get("title", ""),
            "authors": book.get("authors", "") ,
            "published": book.get("published", ""),
            "average_rating": book.get("average_rating", ""),
            "language_code": book.get("language_code", ""),
            "ratings_count": book.get("ratings_count", ""),
            "text_reviews_count": book.get("text_reviews_count", ""),
            "publication_date":book.get("publication_date", ""), 
            "createdAt": convertDateToString(book.get("createdAt", "")),
            "updatedAt": convertDateToString(book.get("updatedAt", ""))
        }
    @staticmethod
    def mapBooks(books):
        return list(map(lambda x: BooksController.mapBook(x), books))
    

    