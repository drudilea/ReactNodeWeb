import React, { Component } from 'react';
import PhotosTable from '../../../components/Tables/PhotosTable';
import ResourcesService from '../../../services/resources-service';

export class Photos extends Component {
  state = {
    photos: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.getPhotos(this.getParsedParams(pagination));
  }

  getParsedParams = (pagination) => {
    return {
      _page: pagination.current,
      _limit: pagination.pageSize,
    };
  };

  handleTableChange = (pagination) => {
    this.getPhotos(this.getParsedParams(pagination));
  };

  getPhotos(params) {
    this.setState({ loading: true });
    ResourcesService.getPhotos(params).then((response) => {
      if (response) {
        return this.setState({
          loading: false,
          photos: response.photos,
          pagination: {
            ...params.pagination,
            total: response.totalCount,
          },
        });
      }
      this.setState({
        loading: false,
        photos: [],
      });
    });
  }

  render() {
    const { photos, pagination, loading } = this.state;

    return (
      <PhotosTable
        data={photos}
        loading={loading}
        pagination={pagination}
        onChange={this.handleTableChange}
      ></PhotosTable>
    );
  }
}

export default Photos;
