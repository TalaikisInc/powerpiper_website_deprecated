import moment from 'moment'

const Date = (value) => {
  if (value) {
    return moment.utc(value).format('YYYY-MM-DD  hh:mm')
  }
}

export default Date
