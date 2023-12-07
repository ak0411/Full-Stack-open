import { useSelector, useDispatch  } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => 
      anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  })

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(likeAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  const byDescVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      {anecdotes
        .sort(byDescVotes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList