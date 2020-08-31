import moment from 'moment'

const formatTimeAgo = (date) => moment(date).fromNow()

export default formatTimeAgo
