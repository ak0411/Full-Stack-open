import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


describe('Blog Form', () => {
  test('receives right detail when a new blog is created', async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={addBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const submitButton = screen.getByText('create')

    await user.type(inputs[0], 'testing a form...')
    await user.type(inputs[1], 'anonymous')
    await user.type(inputs[2], 'www.unknown.com')
    await user.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(addBlog.mock.calls[0][0].author).toBe('anonymous')
    expect(addBlog.mock.calls[0][0].url).toBe('www.unknown.com')
  })
})