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
import {
  allPagesAction,
  deletePageAction,
  deletePageResetAction,
  pageDetailAction, pageDetailResetAction,
} from "../../../redux/actions/page/pageActions";
import SweetAlert from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";

const AllPages = () => {
  const dispatch = useDispatch();

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [itemData, setItemData] = useState(null);

  const {
    allPagesLoading,
    allPagesData,
    allPagesError,
    deletePageLoading,
    deletePageData,
    deletePageError,
    pageDetailLoading,
    pageDetailData,
    pageDetailError,
  } = useSelector((state) => state.page.pageReducer);

  useEffect(() => {
    if (deletePageData?.statusCode === 200) {
      setItemData(null);
      setDeleteAlert(false);
      dispatch(allPagesAction({}));
      setTimeout(() => dispatch(deletePageResetAction()), 5000);
    }
  }, [deletePageData]);

  useEffect(() => {
    dispatch(allPagesAction({}));
  }, []);

  const showDeleteAlert = (item) => {
    setItemData(item);
    setDeleteAlert(true);
  };

  const showDetailModal = (item) => {
    dispatch(
      pageDetailAction({
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
          {deletePageData?.statusCode === 200 && (
            <div className="text-white bg-success p-1 mb-2">
              <span>{deletePageData?.message}</span>
            </div>
          )}

          {allPagesLoading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th width="100">#</th>
                  <th>Title</th>
                  <th width="400">Action</th>
                </tr>
              </thead>
              <tbody>
                {allPagesData?.data?.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{item.title}</td>
                    <td>
                      <Button.Ripple
                        className="mr-1 mb-1"
                        color="success"
                        onClick={() => showDetailModal(item)}
                      >
                        Detail
                      </Button.Ripple>
                      <Button.Ripple className="mr-1 mb-1" color="primary" href={`/admin/edit-page/${item.id}`}>
                        Edit
                      </Button.Ripple>
                      <Button.Ripple
                        className="mr-1 mb-1"
                        color="danger"
                        onClick={() => showDeleteAlert(item)}
                      >
                        {deletePageLoading && itemData?.id === item.id ? (
                          <span>
                            <Spinner color="white" size="sm" /> Delete
                          </span>
                        ) : (
                          <span>Delete</span>
                        )}
                      </Button.Ripple>
                    </td>
                  </tr>
                ))}
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
            deletePageAction({
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
        <ModalHeader>Basic Modal</ModalHeader>
        <ModalBody>
          {pageDetailLoading ? (
            <div className="text-center p-5">
              <Spinner />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: pageDetailData?.data?.description,
              }}
            ></div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setDetailModal(false);
              setItemData(null);
              dispatch(pageDetailResetAction())
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AllPages;
