import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  allBlogsAction,
  blogDetailAction,
  blogDetailResetAction,
  deleteBlogAction,
  deleteBlogResetAction,
} from "../../../redux/actions/blog/blogActions";
import { Edit } from "react-feather";

const AllBlogs = () => {
  const dispatch = useDispatch();

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [itemData, setItemData] = useState(null);

  const {
    allBlogsLoading,
    allBlogsData,
    allBlogsError,
    deleteBlogLoading,
    deleteBlogData,
    deleteBlogError,
    blogDetailLoading,
    blogDetailData,
    blogDetailError,
  } = useSelector((state) => state.blog.blogReducer);

  useEffect(() => {
    if (deleteBlogData?.statusCode === 200) {
      setItemData(null);
      setDeleteAlert(false);
      dispatch(allBlogsAction({}));
      setTimeout(() => dispatch(deleteBlogResetAction()), 5000);
    }
  }, [deleteBlogData]);

  useEffect(() => {
    dispatch(allBlogsAction({}));
  }, []);

  const showDeleteAlert = (item) => {
    setItemData(item);
    setDeleteAlert(true);
  };

  const showDetailModal = (item) => {
    dispatch(
      blogDetailAction({
        id: item.id,
      })
    );
    setDetailModal(true);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardBody>
          {deleteBlogData?.statusCode === 200 && (
            <div className="text-white bg-success p-1 mb-2">
              <span>{deleteBlogData?.message}</span>
            </div>
          )}

          {allBlogsLoading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th width="100">#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>URL</th>
                  <th width="400">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBlogsData?.data.length > 0 ? (
                  allBlogsData?.data?.map((item, index) => (
                    <tr key={index}>
                      <th>{++index}</th>
                      <td>
                        <img src={item.image} height={80} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.slug}</td>
                      <td>
                        <Button.Ripple
                          className="mr-1 mb-1"
                          color="success"
                          onClick={() => showDetailModal(item)}
                        >
                          Detail
                        </Button.Ripple>
                        <Button.Ripple
                          className="mr-1 mb-1"
                          color="primary"
                          href={`/admin/edit-blog/${item.id}`}
                        >
                          Edit
                        </Button.Ripple>
                        <Button.Ripple
                          className="mr-1 mb-1"
                          color="danger"
                          onClick={() => showDeleteAlert(item)}
                        >
                          {deleteBlogLoading && itemData?.id === item.id ? (
                            <span>
                              <Spinner color="white" size="sm" /> Delete
                            </span>
                          ) : (
                            <span>Delete</span>
                          )}
                        </Button.Ripple>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" align="center">
                      <strong>No record Found!</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
      <SweetAlert
        title="Are you sure?"
        warning
        show={deleteAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          dispatch(
            deleteBlogAction({
              id: itemData?.id,
            })
          );
          setDeleteAlert(false);
        }}
        onCancel={() => {
          setDeleteAlert(false);
          setItemData(null);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
      <Modal isOpen={detailModal} className="modal-lg">
        <ModalHeader>Blog Details</ModalHeader>
        <ModalBody>
          {blogDetailLoading ? (
            <div className="text-center p-5">
              <Spinner />
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h1>{blogDetailData?.data?.title}</h1>
              </div>
              <div className="text-center mb-5">
                <img src={blogDetailData?.data?.image} height={300}/>
              </div>
              <div className="p-1 text-break"
                dangerouslySetInnerHTML={{
                  __html: blogDetailData?.data?.description,
                }}
              ></div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setDetailModal(false);
              setItemData(null);
              dispatch(blogDetailResetAction());
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AllBlogs;
