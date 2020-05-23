const columns = [
    {
      title: '序号',
      dataIndex: 'xuaho',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'xuaho' },
    },
    {
      title: '小说名称',
      dataIndex: 'book_name',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'book_name' },
    },
    {
      title: '作者',
      dataIndex: 'book_author',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'book_author' },
    },
    {
      title: '是否完结',
      dataIndex: 'book_isOver',
      width:'15%',
      align:'center',
      scopedSlots: { customRender: 'book_isOver' },
    },
    {
      title: '图书图片',
      dataIndex: 'book_img',
      width:'15%',
      align:'center',
      scopedSlots: { customRender: 'book_img' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      scopedSlots: { customRender: 'action' },
    },
  ];
  const allcolumns = [
    {
      title: '序号',
      dataIndex: 'xuaho',
      width: '3%',
      align:'center',
      scopedSlots: { customRender: 'xuaho' },
    },
    {
      title: '小说名称',
      dataIndex: 'book_name',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'book_name' },
    },{
      title: '小说介绍',
      dataIndex: 'book_introduction',
      width: '50%',
      align:'center',
      scopedSlots: { customRender: 'book_introduction' },
    },
    {
      title: '作者',
      dataIndex: 'book_author',
      width: '5%',
      align:'center',
      scopedSlots: { customRender: 'book_author' },
    },
    {
      title: '图书图片',
      dataIndex: 'book_img',
      width:'20%',
      align:'center',
      scopedSlots: { customRender: 'book_img' },
    },
  ];
  const boyColumns = [
    {
      title: '序号',
      dataIndex: 'xuaho',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'xuaho' },
    },
    {
      title: '小说名称',
      dataIndex: 'book_name',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'book_name' },
    },
    {
      title: '小说类型',
      dataIndex: 'book_type',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'book_type' },
    },
    {
      title: '描述',
      dataIndex: 'book_desc',
      width:'15%',
      align:'center',
      scopedSlots: { customRender: 'book_desc' },
    },
    {
      title: '图书图片',
      dataIndex: 'book_img',
      width:'15%',
      align:'center',
      scopedSlots: { customRender: 'book_img' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      scopedSlots: { customRender: 'action' },
    },
  ];

  const userColumns = [
    {
      title: '序号',
      dataIndex: 'xuhao',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'xuhao' },
    },
    {
      title: '账号',
      dataIndex: 'username',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'username' },
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: '15%',
      align:'center',
      scopedSlots: { customRender: 'password' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      scopedSlots: { customRender: 'action' },
    },
  ];

  export {columns,boyColumns, userColumns, allcolumns}