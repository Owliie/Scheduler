import * as Templates from './templates'
export { Templates }

export const Input = {
    parse: function (input: any, template: any): any {
        const result = {
            missing: '',
            data: {}
        }

        const allProps = template.required.concat(template.optional)

        for (let i = 0; i < allProps.length; i++) {
            const prop = allProps[i]

            if (input[prop] === undefined && i < template.required.length) {
                result.missing = prop
                return result
            }

            if (template.subTemplates && template.subTemplates[prop]) {
                if (template.subTemplates[prop].type === 'array') {
                    result.data[prop] = []
                    if (Array.isArray(input[prop])) {
                        for (let j = 0; j < input[prop].length; j++) {
                            const required = template.subTemplates[prop].required
                            const optional = template.subTemplates[prop].optional
                            if (Input.isEmptyArray(required) && Input.isEmptyArray(optional)) {
                                result.data[prop].push(input[prop][j])
                            } else {
                                const arrayParsed = Input.parse(input[prop][j], template.subTemplates[prop])
                                if (arrayParsed.missing) {
                                    result.missing = `${prop}.${arrayParsed.missing}`
                                } else {
                                    result.data[prop].push(arrayParsed.data)
                                }
                            }
                        }
                    } else {
                        result.missing = `${prop} should be array`
                    }
                } else {
                    const parsed = Input.parse(input[prop], template.subTemplates[prop])
                    if (parsed.missing) {
                        result.missing = `${prop}.${parsed.missing}`
                    } else {
                        result.data[prop] = parsed.data
                    }
                }
            } else if (!Input.isEmpty(input)) {
                result.data[prop] = input[prop]
            }
        }

        return result
    },
    parseRequire: function (input: any, template: any): any {
        const parsed = Input.parse(input, template)
        if (parsed.missing) {
            throw new Error(`Input should have ${parsed.missing}`)
        }

        return parsed.data
    },
    notEmpty: function (input: any) {
        if (Input.isEmpty(input)) {
            throw new Error('Input should not be empty')
        }
    },
    notBoolOrEmpty: function (input: any) {
        if (Input.isEmpty(input) || typeof input === 'boolean') {
            throw new Error('Input should not be empty or boolean')
        }

        return input
    },
    isEmpty: function (input: any): boolean {
        return (
            input === undefined ||
            input === null ||
            input === {} ||
            input === [] ||
            input === ''
        )
    },
    isEmptyArray: function (input: any[]): boolean {
        return input.length === 0
    }
}
