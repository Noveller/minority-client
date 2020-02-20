const manipulateQuery = {
    methods: {
        setQuery(query) {
            let obj = Object.assign({}, this.$route.query);

            Object.keys(query).forEach(key => {
                let value = query[key];
                if (value) {
                    obj[key] = value
                } else {
                    delete obj[key]
                }
            })

            this.$router.push({
                ...this.$router.currentRoute,
                query: obj
            })
        },

        removeQuery(queryNameArray) {
            let obj = {}
            queryNameArray.forEach(key => {
                obj[key] = null
            })
            this.setQuery(obj)
        },

        getArrayQueryParam(param) {
            return !param ? null : [].concat(param);
        }
    }
};

export default manipulateQuery
