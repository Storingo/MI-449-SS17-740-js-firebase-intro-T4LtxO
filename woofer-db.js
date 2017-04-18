// TODO Sign into the database anonymously

  // Initialize Firebase
var config = {
  apiKey: 'AIzaSyBzpvrrohOX3mU_izI7Kb7Xw3dr0TfPVrA',
  authDomain: 'woofer-295b4.firebaseapp.com',
  databaseURL: 'https://woofer-295b4.firebaseio.com',
  projectId: 'woofer-295b4',
  storageBucket: 'woofer-295b4.appspot.com',
  messagingSenderId: '816950254368'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  // TODO create a new record in Firebase
  firebase.database().ref('woofs').push({
    created_at: woof.created_at,
    text: woof.text
  })
}

// READ from Firebase when woofs are added, changed, or removed
// Call addWoofRow, updateWoofRow, and deleteWoofRow to update the page
function readWoofsInDatabase () {
  // TODO read new, changed, and deleted Firebase records
  firebase.database().ref('woofs')
  .on('child_added', function (newWoofSnapshot) {
    addWoofRow (newWoofSnapshot.key, newWoofSnapshot.val())
  })
  firebase.database().ref('woofs')
  .on('child_changed', function (newWoofSnapshot) {
    updateWoofRow (newWoofSnapshot.key, newWoofSnapshot.val())
  })
  firebase.database().ref('woofs')
  .on('child_removed', function (newWoofSnapshot) {
    deleteWoofRow (newWoofSnapshot.key)
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // TODO update the record in Firebase
  firebase.database().ref('woofs').child(woofKey).child('text').set(
    woofText
  )
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // TODO delete the record from Firebase
  firebase.database().ref('woofs/'+woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
