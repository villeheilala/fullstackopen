/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
// fullstackopen 2019 course work 5.1-5.4
// ville heilala

import React, { useState, useEffect } from 'react';
import {
  Container, Form, Button,
  Grid, Segment, Divider, Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import Blog from './components/Blog';
import Alert from './components/Alert';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';
// import blogService from './services/blogs';
import loginService from './services/login';
import { useField, useResource } from './hooks';

const Page = styled.div`
padding: 1em;
background: papayawhip;
`;

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [blogs, blogService] = useResource('http://localhost:3003/api/blogs');
  // const [newBlogTitle, setNewBlogTitle] = useState('')
  const newBlogTitle = useField('text');
  // const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const newBlogAuthor = useField('text');
  // const [newBlogUrl, setNewBlogUrl] = useState('')
  const newBlogUrl = useField('text');
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll();
    // blogService.getAll().then(blogs =>
    //  setBlogs(blogs)
    // )
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.value && password.value) {
      try {
        const user = await loginService.login({
          username: username.value, password: password.value,
        });

        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(user),
        );
        blogService.setToken(user.token);
        setUser(user);
        password.reset();
        username.reset();
        setMessage({
          text: `Welcome ${user.name}`,
          type: 'success',
        });
      } catch (exception) {
        setMessage({
          text: 'Log in error',
          type: 'warning',
        });
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const blogFormRef = React.createRef();

  const handleCreate = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    const newBlog = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
    };

    const savedBlog = await blogService.create(newBlog);

    savedBlog.user = {
      name: user.name,
      username: user.username,
    };

    blogService.getAll();
    // setBlogs([...blogs, savedBlog])
    // setNewBlogAuthor('')
    newBlogAuthor.reset();
    // setNewBlogTitle('')
    newBlogTitle.reset();
    // setNewBlogUrl('')
    newBlogUrl.reset();

    setMessage({ text: 'New blog added' });
    setTimeout(() => {
      setMessage({});
    }, 5000);
  };

  const loginForm = () => (
    <Segment placeholder>
      <h2>Log in</h2>
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <Form onSubmit={handleLogin}>
            <Form.Field>
              <label>Username</label>
              <input name="username" {...username.bind} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" {...password.bind} />
            </Form.Field>
            <Button type="submit">Login</Button>
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Button content="Sign up" icon="signup" size="big" />
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </Segment>
  );

  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    window.location.reload();
  };

  const byLikes = (asc = true) => () => (
    asc
      // setBlogs(blogs.sort((a, b) => a.likes - b.likes)) :
      // setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      ? blogs.sort((a, b) => a.likes - b.likes)
      : blogs.sort((a, b) => b.likes - a.likes)
  );

  if (user === null) {
    return (
      <Container>
        <h1>Bloglist</h1>
        {message && <Alert text={message.text} type={message.type} />}
        {loginForm()}
      </Container>
    );
  }

  return (
    <Page>
      <Container>
        <Header
          as="h2"
          content="Bloglist"
          subheader="Coursework for Fullstackopen´19"
        />
        {message && <Alert text={message.text} type={message.type} />}
        <p>
          {user.name}
          logged in
          <Button onClick={logOut}>
            Logout
          </Button>
        </p>
        <p>
          Sort by:
          <Button onClick={byLikes()}>Likes (asc)</Button>
          <Button onClick={byLikes(false)}>Likes (desc)</Button>
        </p>
        <Togglable buttonLabel="Add note" ref={blogFormRef}>
          <NewBlogForm
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            // handleNewTitleChange={({ target }) => setNewBlogTitle(target.value)}
            // handleNewAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            // handleNewUrlChange={({ target }) => setNewBlogUrl(target.value)}
            handleSubmit={handleCreate}
          />
        </Togglable>
        {blogs.sort(byLikes).map((blog) => <Blog key={blog.id} blog={blog} setBlogs={blogService} user={user} />)}
      </Container>
      <Footer>
          Heilala 2019
      </Footer>
    </Page>
  );
};

export default App;
