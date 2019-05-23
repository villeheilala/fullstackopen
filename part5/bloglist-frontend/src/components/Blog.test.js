/* eslint-disable no-unused-vars */
// fullstackopen 2019 course work 5.15
// ville heilala

/* eslint-disable no-unused-vars */
import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'blog with a title',
    author: 'Matti Mallikas',
    url: 'some url',
    user: {
      name: 'Matti Mainio',
      username: 'matti.mainio'
    },
    likes: 10
  }

  const user = {
    username: 'Paavo Pölli'
  }

  const mockHandler = jest.fn()

  afterEach(cleanup)

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
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

  it('details not visible if not toggled', () => {
    const div = component.container.querySelector('.details')
    expect(div).toHaveStyle('display: none')
  })

  it('details visible when toggled', () => {
    const button = component.container.querySelector('.title')
    fireEvent.click(button)
    const div = component.container.querySelector('.details')
    expect(div).not.toHaveStyle('display: none')
  })

})