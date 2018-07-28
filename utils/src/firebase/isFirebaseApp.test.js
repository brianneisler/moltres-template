import firebase from 'firebase'
import isFirebaseApp from './isFirebaseApp'

describe('isFirebaseApp', () => {
  test('require runs without error', async () => {
    const app = firebase.initializeApp()
    expect(isFirebaseApp(app)).toBe(true)
  })
})
