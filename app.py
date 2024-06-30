from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os 

load_dotenv()  

app = Flask(__name__)

# Rota para servir a página HTML
@app.route('/')
def index():
    return render_template('index.html')

# Rota para lidar com a solicitação de busca de filmes
@app.route('/search_movies', methods=['POST'])
def search_movies():
    search_query = request.form['searchQuery']
    api_key = os.getenv('API_KEY')
    url = f'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search_query}'
    
    response = requests.get(url)
    data = response.json()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
