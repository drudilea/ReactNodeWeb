import React, { Component } from 'react';
import PostsTable from '../../../components/Tables/PostsTable';
import ResourcesService from '../../../services/resources-service';

export class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    this.setState({ loading: true });
    ResourcesService.getPosts().then((response) => {
      if (response) {
        return this.setState({
          loading: false,
          posts: response.posts,
        });
      }
      this.setState({
        loading: false,
        posts: [],
      });
    });
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <div>
        <PostsTable data={posts} loading={loading}></PostsTable>
      </div>
    );
  }
}

export default Posts;
