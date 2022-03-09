from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite') 

db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, unique = True, nullable = False)
    author = db.Column(db.String, nullable = False)
    review = db.Column(db.String, nullable = True)
    genre = db.Column(db.String, nullable = True)
    price = db.Column(db.Float, nullable = True)

    def __init__(self, title, author, review, genre, price):
        self.title = title
        self.author = author
        self.review = review
        self.genre = genre
        self.price = price

class BookSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "author", "review", "genre", "price")

book_schema = BookSchema()
multiple_book_schema = BookSchema(many = True)

@app.route('/book', methods = ['POST'])
def add_book():

    post_data = request.get_json()
    title = post_data.get('title')
    author = post_data.get('author')
    review = post_data.get('review')
    genre = post_data.get('genre')
    price = post_data.get('price')

    book = db.session.query(Book).filter(Book.title == title).first()

    if book:
        return jsonify('You Have used a title that already exists')

    new_book = Book(title, author, review, genre, price)
    db.session.add(new_book)
    db.session.commit()

    return jsonify("You've added a book!")

@app.route('/books', methods = ['GET'])
def get_books():
    books = db.session.query(Book).all()
    return jsonify(multiple_book_schema.dump(books))

if __name__ == "__main__":
    app.run(debug = True)

    
