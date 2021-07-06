// const couchbase = require('couchbase');
var couch = require('couch-db')
const config = require('/Users/michaelgallien/HackReactor/SDC/Sidebar/couchbaseConfig.js');
const faker = require('faker');
const axios = require('axios');

var server = couch('https://localhost:5984', {
  rejectUnauthorized: false
});

server.auth('admin', 'password');

var db = server.database('test');

function dataGenerator() {
  let data = [];
  let record = {}
  record['package_name'] = faker.commerce.productMaterial();
  record['product_name'] = faker.commerce.productName();
  data.push(record);
  return data;
};

// NEW SCHEMA
// {
//   courseId: Number,
//   basePrice: Number,
//   discountPercentage: Number,
//   discountedPrice: Number,
//   saleEndDate: Date,
//   saleOngoing: Boolean,
//   previewVideoUrl: String,
//   fullLifetimeAccess: String,
//   accessTypes: String,
//   assignments: Boolean,
//   certificateOfCompletion: Boolean,
//   downloadableResources: Number
// }

const randomDecider = (percentageChance) => {
  if (Math.random() * 100 < percentageChance) {
    return true;
  } else {
    return false;
  }
}

const createBasePrice = () => {
  const minPrice = 49.99;
  const maxPrice = 149.99;

  let range = Math.ceil(maxPrice) - Math.ceil(minPrice);

  range = range / 10;

  let basePrice = (Math.floor(Math.random() * range) * 10 + Math.floor(minPrice) + 0.99);

  if (randomDecider(20)) {
    basePrice = basePrice + 5;
  }

  basePrice = Math.round(basePrice * 100) / 100;

  return basePrice;
}


let url = `http://admin:password@localhost:5984/sidebar/_bulk_docs`;

let counter = 0;

let seedCouchDB = () => {
  let data = {
    docs: []
  };

  for (var i = 0; i < 1000; i++) {
    const basePrice = createBasePrice();
    const baseDiscountPercentage = 84;
    const discountedPrice = (Math.round(Math.floor(basePrice * ((100 - baseDiscountPercentage) / 100)) * 100) / 100) + 0.99
    const saleEndDate = new Date();
    const videoIndex = Math.floor(Math.random() * 10);
    data.docs.push({
      courseId: counter,
      basePrice: basePrice,
      discountPercentage: Math.round((1 - (discountedPrice / basePrice)) * 100),
      discountedPrice: discountedPrice,
      saleEndDate: saleEndDate.setDate(saleEndDate.getDate() + 3),
      saleOngoing: randomDecider(30),
      previewVideoUrl: "https://example.com/previewVideo" + videoIndex + ".mp4",
      fullLifetimeAccess: randomDecider(70) ? "Full lifetime access" : "Full access during subscription term",
      accessTypes: "Access on mobile and TV",
      assignments: randomDecider(70),
      certificateOfCompletion: randomDecider(90),
      downloadableResources: randomDecider(90) ? Math.round(Math.random() * 25) : 0
    });
    counter++;
  }

  axios.post(url, data)
    .then((res) => {
      if (counter <= 10000000) {
        data.docs = [];
        seedCouchDB()
      }
    })
    .catch((err) => {
      console.log(err);
    });


}

seedCouchDB();