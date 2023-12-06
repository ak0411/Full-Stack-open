import { useSelector, useDispatch  } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdoteOf(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList