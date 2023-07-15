const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://chaish:ckgtWIOanhv0H1cT@cluster0.esitssu.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB');
}

connect();

async function importCSVToMongoDB() {
  const database = client.db('shipthis');
  const collection = database.collection('movies');

  fs.createReadStream('./netflix_titles.csv')
    .pipe(csv())
    .on('data', (data) => {
      // Manipulate the data as needed before inserting into MongoDB
      const transformedData = {
        id: data.show_id,
        showtype: data.showtype,
        title: data.title,
        director: data.director,
        cast: data.cast,
        country: data.country,
        date_added: data.date_added,
        release_year: data.release_year,
        rating: data.rating,
        duration: data.duration,
        listed_in: data.listed_in,
        description: data.description
        // Add more fields as necessary
      };

      collection.insertOne(transformedData);
    })
    .on('end', () => {
      console.log('CSV data successfully imported to MongoDB');
    });
}

importCSVToMongoDB();