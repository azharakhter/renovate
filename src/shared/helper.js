class Helper{
 /**
     * 
     * @param {*} data 
     */
  shallowCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }
  
    /**
     * 
     * @param {*} arr 
     * @param {*} key 
     */
     getUniqueElements(arr, key) {
        return new Set(arr.map(a => a[`${key}`]));
    }

    /**
     * 
     */
    getRandomNumberHash() {
        return Math.floor(Math.random() * 10000000000);
    }

    /**
     * 
     * @param {*} arr 
     */
    filterNonNull(arr) {
        return arr.filter(e => e !== null && e !== undefined);
    }


  async getPaginatedRecords(repo, page, per_page, order, order_by, filter, where, include) {

    const orderBy = order_by ? order_by : 'ASC';

    const recordOrder = order ? order : 'id';

    const whereClause = filter ? where : null;
    

    const options = {
        page: parseInt(page),
        paginate: parseInt(per_page),
        order: [[`${recordOrder}`, `${orderBy}`]],
        include,
        where: { ...whereClause, deleted_at: null }
    };

    const { docs, pages, total } = await repo.pagination(options);

    return {
        docs: this.shallowCopy(docs),
        pages,
        total
    };

}
/**
 * 
 * @param {*} data 
 * @param {*} repo 
 */

 async _updateSearchCount(data, repo) {

    const {
        ids
    } = data;

    return repo.increment('search_count', 1, { id: { [Op.in]: [...ids] }});

}

}

module.exports=Helper;