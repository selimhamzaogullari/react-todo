export const allLinks = (obj) => {
  return {
    type: 'ALL_LINKS',
    payload: []
  }
}

export const addLink = obj => ({
  type: 'ADD_LINK',
  payload: obj
})

export const removeLink = id => ({
  type: 'REMOVE_LINK',
  payload: id
})

export const upVote = id => ({
  type: 'UP_VOTE',
  payload: id
})

export const downVote = id => ({
  type: 'DOWN_VOTE',
  payload: id
})

export const sortingLinks = sortLink => ({
  type: 'SORTING',
  payload: sortLink
})
