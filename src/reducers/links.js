// Sort by date on first opening
const sorting = () => {
  if(localStorage.getItem('links')) {
    const getLinks = JSON.parse(localStorage.getItem('links'));
    const d =getLinks.sort((a,b) => {
      return b.createdAt - a.createdAt;
    });
    return d;
  } else {
    return [];
  }
}

const initialState = {
  links: sorting()
}

console.log(initialState);

const linksReducer = (state= initialState, action) => {
  switch (action.type) {
    case 'ADD_LINK':
      return {
        ...state,
        links: [action.payload, ...state.links]
      }
    case 'REMOVE_LINK':
      return {
        links: state.links.filter(link => link.id !== action.payload)
      }
    case 'UP_VOTE':
      state.links.filter(link => {
        if(link.id === action.payload) {
          link.vote++;
        }
      });
      return {
        links: [...state.links]
      }
    case 'DOWN_VOTE':
      state.links.filter(link => {
        if(link.id === action.payload) {
          link.vote !== 0 && link.vote--;
        }
      });
      return {
        links: [...state.links]
      }
    case 'SORTING':
      return {
        links: [...action.payload]
      }
    default:
      return state;
  }
}

export default linksReducer;
