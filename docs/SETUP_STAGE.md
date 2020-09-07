# SETUP STAGE

Instructions on how to setup a new stage.

- pick a `stage` name that does not already exist.
  - something like `qa`, `test`, etc...

Register a domain 
- example-[stage].com


Setup Firebase project
- create a new firebase project named `example-[stage]`
- ensure google analytics is enabled

Add domain to firebase project
- click on hosting
- then "add custom domain"
- enter domain "example-[stage].com"
- setup A records with domains.google.com
- setup redirect of www.example-[stage].com to example-[stage].com

Setup Google Analytics
- TODO

Add stage to .firebaserc
- `"[stage]": "example-[stage]"`
- commit changes 

Setup stage files
- add new stage directory
```
/stages/[stage]
```
- create `.env` file
```
/stages/[stage]/.env
```
- create `config.yaml` file
```
/stages/[stage]/config.yaml
```

Setup database backup
- Create a database backup bucket in `https://cloud.google.com` dashboard
- name the bucket `backups.database.example-[stage].com`
- config for backup bucket
  - us-central1
  - nearline
  - fine-grained access control
- ensure proper permissions are given to the firebase service account
  - https://firebase.google.com/docs/firestore/solutions/schedule-export
  - Assign the Cloud Datastore Import Export Admin role. Replace PROJECT_ID and
    FIREBASE_CLIENT_EMAIL and then
    run the following command:
  ```
  gcloud projects add-iam-policy-binding PROJECT_ID \
    --member serviceAccount:FIREBASE_CLIENT_EMAIL \
    --role roles/datastore.importExportAdmin
  ```
  - Assign the Storage Admin role on your bucket. Replace FIREBASE_CLIENT_EMAIL and
    BUCKET_NAME, and run the following command:
  ```
  gsutil iam ch serviceAccount:FIREBASE_CLIENT_EMAIL:admin \
    gs://BUCKET_NAME
  ```

TODO Setup   
- setup emails for new domain
- Setup Twilio project for stage
- Setup monitoring for stage on google cloud
- Setup firebase web app for stage
- Setup web master tools
- Signup for blaze pay as you go
- Setup account billing budget
