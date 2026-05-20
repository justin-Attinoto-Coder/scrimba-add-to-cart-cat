import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL:
    'https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', addItem)
inputFieldEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItem()
  }
})

showEmptyState()

function clearInputField() {
  inputFieldEl.value = ''
}

function showEmptyState() {
  shoppingListEl.innerHTML = '<li class="no-items">No items here... yet ��</li>'
}

async function addItem() {
  const value = inputFieldEl.value.trim()

  if (!value) {
    return
  }

  try {
    await push(shoppingListInDB, value)
    clearInputField()
  } catch (error) {
    console.error('Unable to add item:', error)
  }
}

onValue(
  shoppingListInDB,
  (snapshot) => {
    shoppingListEl.innerHTML = ''

    if (!snapshot.exists()) {
      showEmptyState()
      return
    }

    const itemsArray = Object.entries(snapshot.val())

    for (const [id, value] of itemsArray) {
      const itemEl = document.createElement('li')
      itemEl.textContent = value
      itemEl.tabIndex = 0

      itemEl.addEventListener('click', () => {
        remove(ref(database, `shoppingList/${id}`)).catch((error) => {
          console.error('Unable to delete item:', error)
        })
      })

      itemEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          itemEl.click()
        }
      })

      shoppingListEl.append(itemEl)
    }
  },
  (error) => {
    console.error('Unable to sync shopping list:', error)
    shoppingListEl.innerHTML =
      '<li class="no-items">Unable to load list. Check Firebase settings.</li>'
  },
)
