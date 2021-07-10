const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('testing', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Data Generators
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

// Schemas
  // Pricedata
  // courseId: index,
  // basePrice: basePrice,
  // discountPercentage: Math.round((1 - (discountedPrice / basePrice)) * 100),
  // discountedPrice: discountedPrice,
  // saleEndDate: saleEndDate.setDate(saleEndDate.getDate() + 3),
  // saleOngoing: randomDecider(30)

  // Videopreviewdata
  // courseId: FOREIGN_KEY,
  // previewVideoUrl: "https://example.com/previewVideo" + videoIndex + ".mp4",

  // Sidebardata
  // courseId: FOREIGN_KEY,
  // fullLifetimeAccess: randomDecider(70) ? "Full lifetime access" : "Full access during subscription term",
  // accessTypes: "Access on mobile and TV",
  // assignments: randomDecider(70),
  // certificateOfCompletion: randomDecider(90),
  // downloadableResources: randomDecider(90) ? Math.round(Math.random() * 25) : 0,


const Pricedata = sequelize.define('Pricedata', {
  courseId: {
    type: DataTypes.INTEGER
  },
  basePrice: {
    type: DataTypes.INTEGER
  },
  discountPercentage: {
    type: DataTypes.INTEGER
  },
  discountedPrice: {
    type: DataTypes.INTEGER
  },
  saleEndDate: {
    type: DataTypes.DATE
  },
  saleOngoing: {
    type: DataTypes.BOOLEAN
  }
})

const Videopreviewdata = sequelize.define('Videopreviewdata', {
  previewVideoUrl: {
    type: DataTypes.STRING
  }
})

const Sidebardata = sequelize.define('Pricedata', {
  fullLifetimeAccess: {
    type: DataTypes.STRING
  },
  accessTypes: {
    type: DataTypes.STRING
  },
  assignments: {
    type: DataTypes.BOOLEAN
  },
  certificateOfCompletion: {
    type: DataTypes.BOOLEAN
  },
  downloadableResources: {
    type: DataTypes.INTEGER
  }
})

let counter = 0;

const popPricedata = async () => {
  let data = [];
  // await sequelize.sync();
  for (var i = 0; i < 100; i++) {
    let id = counter;
    const basePrice = createBasePrice();
    const baseDiscountPercentage = 84;
    const discountedPrice = (Math.round(Math.floor(basePrice * ((100 - baseDiscountPercentage) / 100)) * 100) / 100) + 0.99
    const saleEndDate = new Date();
    data.push({
      courseId: id,
      basePrice: basePrice,
      discountPercentage: baseDiscountPercentage,
      discountedPrice: discountedPrice,
      saleEndDate: saleEndDate,
      saleOngoing: randomDecider(30),
    })
    counter++;
  }

  await Pricedata.bulkCreate(data)
  .then(() => {
    if (counter < 100) {
      popPricedata();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

const popVideopreviewdata = async () => {
  let data = [];
  // await sequelize.sync();
  for (var i = 0; i < 100; i++) {
    const videoIndex = Math.floor(Math.random() * 10);
    data.push({
      previewVideoUrl: "https://example.com/previewVideo" + videoIndex + ".mp4",
    })
    counter++;
  }

  await Videopreviewdata.bulkCreate(data)
  .then(() => {
    if (counter < 100) {
      popVideopreviewdata();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

const popSidebardata = async () => {
  let data = [];
  // await sequelize.sync();
  for (var i = 0; i < 100; i++) {
    data.push({
      fullLifetimeAccess: randomDecider(70) ? "Full lifetime access" : "Full access during subscription term",
      accessTypes: "Access on mobile and TV",
      assignments: randomDecider(70),
      certificateOfCompletion: randomDecider(90),
      downloadableResources: randomDecider(90) ? Math.round(Math.random() * 25) : 0,
    })
    counter++;
  }

  await Sidebardata.bulkCreate(data)
  .then(() => {
    if (counter < 100) {
      popSidebardata();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}


popPricedata();
// popVideopreviewdata();
// popSidebardata();