export const utils = {
    /*
        Provide an array of the same objects and return object of objects mapped by the prop
        ------------------------------------------------------------------------------------
        mapify('a', [{ a: 'hey', b: 2 }, { a: 'there', b: 4 }])
        return {
            hey: { a: 'hey', b: 2 },
            there:  { a: 'there', b: 4 }
        }

    */
    mapify: (prop: string, array: any[]) => {
        const map = {}
        for (let i = 0; i < array.length; i++) {
            const propValue = array[i][prop]
            map[propValue] = array[i]
        }

        return map
    },

    /*
        Provide an array of the same objects and return object of arrays mapped by the prop
        Merge two array elements in case the mapped prop is duplicated
        -----------------------------------------------------------------------------------
        mapifyMerge('a', [{ a: 'hey', b: 2 }, { a: 'hey', b: 4 }, { a: 'there', b: 6 }] )
        return {
            hey: [ { a: 'hey', b: 2 }, { a: 'hey', b: 4 }],
            there:  [{ a: 'there', b: 6 }]
        }

    */
    mapifyMerge: (prop: string, array: any[]) => {
        const map = {}
        for (let i = 0; i < array.length; i++) {
            const propValue = array[i][prop]
            if (!map[propValue]) {
                map[propValue] = []
            }

            map[propValue].push(array[i])
        }

        return map
    },

    toBoolean: (str: string): boolean => {
        return str === 'true'
    }
}
