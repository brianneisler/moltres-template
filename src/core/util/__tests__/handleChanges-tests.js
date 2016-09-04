import 'babel-polyfill'
import { expect } from 'chai'
import handleChanges from '../handleChanges'

describe('handleChanges', function() {

  it('litmus test', function() {
    let funcRun = false
    const nextProps = {
      a: 1
    }
    handleChanges({
      a: (value) => {
        funcRun = true
        expect(value).to.equal(1)
      }
    }, nextProps)
    expect(funcRun).to.be.true
  })
})
