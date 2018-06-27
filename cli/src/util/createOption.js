// const OPTION_REGEX = /--([a-zA-Z][a-zA-Z0-9_]*)/

const createOption = (option, instance) => instance.option(option.option, option.description)

export default createOption
