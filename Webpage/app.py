from flask import Flask,render_template
app = Flask(__name__)

@app.route('/')
def index():
   return render_template("hello.html")

def load_model();
# Load the model
   from tensorflow.keras.models import load_model
   model = load_model("smartphone_trained.h5") #(Name of the model)

if __name__ == '__main__':
   app.run(debug = True)