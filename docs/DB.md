# Data Models
TODO BRN: Auto generate this documentation from the Schema descriptions

## Action

Based on cloudevents spec
https://github.com/cloudevents/spec/blob/master/spec.md

#### Fields
* id: Id
* source: Uri
* specversion: string
* type: string
* time: RFC3339Timestamp),
* payload: any
* datacontentencoding: string 
* datacontenttype: string



## EntityStats
Provides stats for any Entity type in the database. Easy generic method for
storing stats.
```
/EntityStats/{id}
```

#### Fields
* id: Id
* entityType
* entityId
* numberShards: integer



## StatsShards
In order to handle rapidly incrementing stats. We need a way of sharding the
EntityStats. See https://firebase.google.com/docs/firestore/solutions/counters
for more details.
```
EntityStats/{id}/StatsShards/{index}
```

#### Fields
* index: integer
* data: Object



## Image 

#### Fields
* contentType: AllowedImageType
* createdAt: Timestamp
* deletedAt: Timestamp | Null
* hash: SHA256
* height: PositiveInteger | Zero
* id: Id
* length: PositiveInteger
* path: String
* removedByEntityId: Id
* removedByEntityType: Type
* storageBucket: String
* updatedAt: Timestamp
* uploadId: Upload.Id
* width: PositiveInteger | Zero



## PhoneNumber

#### Fields
* id: Id
* number: string
* hash: Hex (unique index)
* type: enum('user', 'unclaimed', 'internal')



## PhoneNumberClaim

#### Fields
* phoneNumberId: PhoneNumber.id 
* userId: User.id 



## SMSChallenge

#### Fields
* id: Id
* code: string:/^[0-9]{6}$/
* phoneNumberId: PhoneNumber.id
* usedAt: Timestamp
* valid: boolean


## SMSChannel

#### Fields
* id: Id
* internalPhoneNumberId: PhoneNumber.id
* userPhoneNumberId: PhoneNumber.id

#### Indexes
NOTE: requires a unique index of both phone numbers combined. Can only allow a single active chanel combination of both phone numbers at



## SMSMessage
* id: Id
* apiVersion: string
* accountSid: string
* body: string
* from: string
* fromCity: string
* fromCountry: string
* fromState: string
* fromZip: string
* media: [
  { contentType: string, url: string }
]
* messageSid: string
* numSegments: string
* smsSid: string
* smsMessageSid: string
* smsStatus: string
* to: string
* toCity: string
* toCountry: string (country code)
* toState: string
* toZip: string


### User
* id: Id
* username: string

#### EntityStats:User
* id: User.id
* userId: User.id
* numberOfFollowers: integer
* numberFollowing: integer
* numberOfWATsPosted: integer
* numberOfWATThisesPosted: integer
* numberOfEntitiesReactedTo: integer


### UserPhoneNumber
* phoneNumberId: PhoneNumber.id (unique index)
* userId: User.id 


### UserProfile
* userId: User.id
* name: string
* bio: string
* location: string
* website: string
* userProfileImageId: UserProfileImage.id

// NOTE: These are used to track all user profile images the user has added. In
the event the user changes their profile image, this maintains a record of which
image was used by what user.



### UserProfileImage
* userId: User.id
* imageId: Image.id

### UserRoles
* id: User.id
* userId: User.id
* role: Enum.('admin')

### UserImage
* id: Id
* imageId: Image.id
* userId: User.id
