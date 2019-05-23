/* eslint-disable no-unused-vars */
// fullstackopen 2019 course work 5.13-5.14
// ville heilala

/* eslint-disable no-unused-vars */
import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component

  const blog = {
    title: 'blog with a title',
    author: 'Matti Mallikas',
    likes: 10
  }

  const mockHandler = jest.fn()

  afterEach(cleanup)

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  it('component has a title', () => {
    const div = component.container.querySelector('.title')
    expect(div).toHaveTextContent(
      'blog with a title'
    )
  })

  it('component has an author', () => {
    const div = component.container.querySelector('.title')
    expect(div).toHaveTextContent(
      'Matti Mallikas'
    )
  })

  it('component has 10 likes', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent(
      'blog has 10 likes'
    )
  })

  it('like button pressed 2 times', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})