import React from 'react'
import { render, waitForElement, cleanup, act } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  let component

  it('if no user logged, notes are not rendered', async () => {

    act(() => {
      component = render(
        <App />
      )
      component.rerender(<App />)
    })

    await waitForElement(
      () => component.getByText('Login')
    )

    expect(component.container.querySelector('.blog')).toBeFalsy()
  })

  it('if user logged, notes render', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    act(() => {
      component = render(
        <App />
      )
      component.rerender(<App />)
    })

    await waitForElement(
      () => component.getByText('Logout')
    )
    //component.debug()
    expect(component.container.querySelector('.blog')).toBeTruthy()
  })
})