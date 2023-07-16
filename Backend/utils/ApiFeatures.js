class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyWord    
  ? {
    $or: [
      { title: { $regex: this.queryStr.keyWord, $options: "i" } },
      { cast: { $regex: this.queryStr.keyWord, $options: "i" } }
    ]
  }
  : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;