class ApiFeatures{
     query:any;
     queryString:any;
  
    constructor(query:any, queryString:any){
         this.query =query
         this.queryString= queryString
    }

    filter(){
        const queryObj = { ...this.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el: any) => delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr))
    }
    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
      return this;
    }
}

export default ApiFeatures