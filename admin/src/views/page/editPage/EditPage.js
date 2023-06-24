import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  Spinner,
} from "reactstrap";

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  pageDetailAction,
  updatePageAction, updatePageResetAction,
} from "../../../redux/actions/page/pageActions";
import { Link } from "react-router-dom";

const EditPageForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {
    pageDetailLoading,
    pageDetailData,
    pageDetailError,
    updatePageLoading,
    updatePageData,
    updatePageError,
  } = useSelector((state) => state.page.pageReducer);

  useEffect(() => {
    if (pageDetailData?.statusCode === 200) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(pageDetailData?.data?.description)
          )
        )
      );
    }
  }, [pageDetailData]);

  useEffect(() => {
    if (updatePageData?.statusCode === 200) {
      setTimeout(() => dispatch(updatePageResetAction()), 5000);
      window.scroll(0, 0);
    }

    if (updatePageError?.response) {
      window.scroll(0, 0);
    }
  }, [updatePageData, updatePageError]);

  useEffect(() => {
    dispatch(pageDetailAction({ id }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Page</CardTitle>
      </CardHeader>
      <CardBody>
        {updatePageData?.statusCode === 200 && (
          <div className="text-white bg-success p-1 mb-2">
            <span>{updatePageData?.message}</span>
          </div>
        )}
        {updatePageError?.response && (
          <div className="text-white bg-danger p-1 mb-2">
            <span>{`${updatePageError?.response.status} - ${updatePageError?.response?.data?.message}`}</span>
          </div>
        )}
        <Formik
          enableReinitialize={true}
          initialValues={{ title: pageDetailData?.data?.title ?? "" }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Must be 3 characters or more.")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            dispatch(
              updatePageAction({
                id: id,
                title: values.title,
                description: draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                ),
              })
            );
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup row>
                <Col md="2">
                  <span>Title</span>
                </Col>
                <Col md="10">
                  <Input
                    type="text"
                    placeholder="Title"
                    {...formik.getFieldProps("title")}
                    disabled={pageDetailLoading || updatePageLoading}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-danger font-small-2">
                      {formik.errors.title}
                    </div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <span>Description</span>
                </Col>
                <Col md="10">
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={setEditorState}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 8, offset: 5 }}>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    {updatePageLoading ? (
                      <>
                        <Spinner color="white" size="sm" />
                        <span className="ml-50">Update</span>
                      </>
                    ) : (
                      <span className="ml-50">Update</span>
                    )}
                  </Button.Ripple>
                  <Link to="/admin/dashboard" className="btn btn-warning">
                    Cancel
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default EditPageForm;
