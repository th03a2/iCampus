const bulkWrite = (Entity, payload, action = "updateOne") => {
  let options = [];

  for (const index in payload) {
    const item = payload[index];

    options.push({
      [action]: {
        filter: { _id: item._id },
        update: { $set: { ...item } },
      },
    });
  }

  return new Promise((resolve, reject) =>
    Entity.bulkWrite(options)
      .then(() => resolve(payload))
      .catch((error) => reject(error))
  );
};

module.exports = bulkWrite;
