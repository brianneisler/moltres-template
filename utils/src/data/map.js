export { map as default } from 'ramda'

// import append from './append'
// import curry from './curry'
// import reduce from './reduce'
//
// const mapSeries = curry(async (fn, data) =>
//   reduce(
//     async (promise, value) => {
//       const accum = await promise
//       const result = await fn(value)
//       return append(result, accum)
//     },
//     Promise.resolve([]),
//     data
//   )
// )
//
// export default mapSeries
