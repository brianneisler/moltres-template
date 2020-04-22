const fromDate = ({ firebase }, date) => firebase.firestore.Timestamp.fromDate(date)

export default fromDate
