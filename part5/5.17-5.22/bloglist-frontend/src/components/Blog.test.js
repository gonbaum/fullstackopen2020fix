import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('Renders initial content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 99,
    user: {
      name: 'Gonzalo'
    },
    id: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  const p = component.container.querySelector('.mainInfo')
  console.log(prettyDOM(p))
  component.debug()

  expect(p).toHaveTextContent(
    'Component testing is done with react-testing-library - Author'
  )

})

test('at start the children are not displayed', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 99,
    user: {
      name: 'Gonzalo'
    },
    id: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')
})
test('when view button is clicked info is displayed', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 99,
    user: {
      name: 'Gonzalo'
    },
    id: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)
  const div = component.container.querySelector('.togglableContent')

  expect(div).not.toHaveStyle('display: none')
})

test('clicking the button twice, event handler is called twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 99,
    user: {
      name: 'Gonzalo'
    },
    id: 1
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})