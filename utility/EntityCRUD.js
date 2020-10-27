
module.exports.createEntity = async (data, type)=>{
    let Entity = require(`../db/models/${type}`)
    let newEntry = new Entity({
        ...data
    })
    let createdEntry= await newEntry.save();
    console.log(createdEntry)
    return createdEntry
}

module.exports.listEntity = async (data, type)=>{
    // console.log("Data ",data, type)
    let filters = require("../utility/generateMongoFilters").generateMongoFilters(data);
    // console.log(filters);
    let Entity = require(`../db/models/${type}`)
    let entityResult = await Entity.aggregate(filters);
    //   console.log(entityResult);
    return entityResult;
}