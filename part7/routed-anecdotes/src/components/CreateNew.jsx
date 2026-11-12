import { useNavigate } from 'react-router'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const { reset: resetContent, ...contentProps } = content
  const { reset: resetAuthor, ...authorProps } = author
  const { reset: resetInfo, ...infoProps } = info

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentProps} />
        </div>
        <div>
          author
          <input name="author" {...authorProps} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
