let operators = ["limit", "page", "perpage", "skip","start"]


module.exports.generateMongoFilters = (args) => {
    let pipeline = [];
    pipeline.push({ $match: {} });
    if (!args.start) args.start = 0;
    let obj = {};
    for (let key in args) {
        if (operators.indexOf(key) == -1) {
            obj[key] = args[key]
        }
    }
    pipeline[0]["$match"] = { ...obj }
    if (args.start || args.start == 0) {
        if(args.page) args.page -= 1;
        if(args.page && !args.perpage) args.perpage = 10;
        if(args.page && args.perpage && !args.start) args.start = args.page * args.perpage;
        pipeline.push({ $skip: args.start })
    }
    if (args.limit || args.perpage) {
        let limit = args.limit || args.perpage
        pipeline.push({ $limit: limit });
    }
    return pipeline
}