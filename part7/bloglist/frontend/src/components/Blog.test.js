import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {
  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'www.jest.com',
    likes: 0,
  }

  const user = userEvent.setup()
  const onLike = jest.fn()
  const onRemove = jest.fn()

  beforeEach(() => {
    const component = render(
      <Blog blog={blog} user={user} onLike={onLike} onRemove={onRemove} />,
    )
    container = component.container
  })

  test('renders title and author, but not URL and likes by default', () => {
    const title_author = container.querySelector('.blogContent')
    expect(title_author).toHaveTextContent(
      'Component testing is done with react-testing-library Jest',
    )
    const url_likes = container.querySelector('.togglableContent')
    expect(url_likes).toHaveStyle('display: none')
  })

  test('URL and likes are shown when show button is clicked', async () => {
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(container).toHaveTextContent('www.jest.com')
    expect(container).toHaveTextContent('0')
  })

  test('clicking like button twice calls the event handler twice', async () => {
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(onLike.mock.calls).toHaveLength(2)
  })
})
