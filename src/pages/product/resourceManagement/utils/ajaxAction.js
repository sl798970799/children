import { message } from 'antd';

async function handleGetDataList() {
  const { productCode } = this.props.location.query;
  const response = await window.sysAjax.get('/api/productJsCss/productJsCssList', {
    params: {
      productCode,
      pageSize: 10,
      pageNum: this.state.currentPage,
    },
  });
  if (response.code !== 200) {
    return;
  }
  this.setState({
    dataSource: response?.data?.dataList || [],
    totalPage: response?.data?.totalPage || 1,
    count: response?.data?.count || 1,
    currentPage: response?.data?.currentPage || 1,
  });
}

async function handleAddDataList(request) {
  const response = await window.sysAjax.post('/api/productJsCss/productJsCssList', request);
  if (response.code !== 200) {
    return;
  }
  handleGetDataList.bind(this)();
  message.success('保存成功');
  this.setState({
    visible: false,
  });
}

async function handleDeleteDataItem(id) {
  const response = await window.sysAjax.delete(`/api/productJsCss/productJsCssList/${id}`);
  if (response.code !== 200) {
    return;
  }
  if (this.state.dataSource.length === 1 && this.state.currentPage !== 1) {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }
  handleGetDataList.bind(this)();
  message.success('删除成功！');
}

export { handleGetDataList, handleDeleteDataItem, handleAddDataList };
