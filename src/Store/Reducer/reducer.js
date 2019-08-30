const initialState = {
  bookList: "",
  genre: "",
  filtre: '',
  redirection: ''


}

function product(state = initialState, action) {


  switch (action.type) {

    case 'GET_LIST':
      var gen = [action.value[0].genre]
      var test = true
      //
      for (let i = 0; i < action.value.length; i++) {
        for (let j = 0; j < gen.length; j++) {
          if (action.value[i].genre == gen[j]) {
            test = false
            break
          }
        }
        if (test) {
          gen.push(action.value[i].genre)

        }
        test = true

      }


      state = { ...state, bookList: action.value, genre: gen }
      console.log("connection to reducer", state.bookList, state.genre);
      return state

    case 'FILTER':
      var fi = []
      if (action.value.genre == "none" && action.value.gender !== "none") {
        fi = state.bookList.filter(book => book.author.gender == action.value.gender)
        state = { ...state, filtre: fi }
        console.log("here is fi", fi);
      }

      if (action.value.genre !== "none" && action.value.gender == "none") {
        fi = state.bookList.filter(book => book.genre == action.value.genre)
        state = { ...state, filtre: fi }

      }

      if (action.value.genre !== "none" && action.value.gender !== "none") {
        fi = state.bookList.filter(book => book.genre == action.value.genre && book.author.gender == action.value.gender)
        state = { ...state, filtre: fi }

      }
      if (action.value.genre == "none" && action.value.gender == "none") {
       
        state = { ...state, filtre: state.bookList }

      }

      return state



    case 'REDIRECTION':
      state = { ...state, redirection: action.value }

      return state
    default:
      return state
  }
}

export default product