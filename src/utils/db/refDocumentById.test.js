import refDocumentById from './refDocumentById'

class Document {
  constructor(id, refCollection) {
    this.refCollection = refCollection
    this.id = id
  }
  collection(collectionName) {
    // eslint-disable-next-line no-use-before-define
    return new Collection(collectionName, this)
  }
}

class Collection {
  constructor(collectionName, ref) {
    this.collectionName = collectionName
    this.ref = ref
  }
  doc(id) {
    return new Document(id, this)
  }
}

class Database {
  constructor() {
    this.id = 'default'
  }
  collection(collectionName) {
    return new Collection(collectionName, this)
  }
}

describe('refDocumentById', () => {
  test('references top level document by id', () => {
    const database = new Database()
    const context = {
      database
    }
    const Schema = {
      collectionName: 'foo'
    }
    const id = 'bar'
    const ref = refDocumentById(Schema, context, id)
    expect(ref).toEqual({
      id,
      refCollection: {
        collectionName: Schema.collectionName,
        ref: {
          id: 'default'
        }
      }
    })
  })

  test('references child document by ids', () => {
    const database = new Database()
    const context = {
      database
    }
    const ParentSchema = {
      collectionName: 'ParentFoo'
    }
    const ChildSchema = {
      collectionName: 'ChildFoo',
      parentSchema: ParentSchema
    }
    const ids = ['parentBar', 'childBar']
    const ref = refDocumentById(ChildSchema, context, ids)
    expect(ref).toEqual({
      id: 'childBar',
      refCollection: {
        collectionName: ChildSchema.collectionName,
        ref: {
          id: 'parentBar',
          refCollection: {
            collectionName: ParentSchema.collectionName,
            ref: {
              id: 'default'
            }
          }
        }
      }
    })
  })
})
