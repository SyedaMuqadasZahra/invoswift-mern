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
  CustomInput,
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
import { Link } from "react-router-dom";
import {
  blogDetailAction,
  updateBlogAction, updateBlogResetAction,
} from "../../../redux/actions/blog/blogActions";

const EditBlogForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {
    blogDetailLoading,
    blogDetailData,
    updateBlogLoading,
    updateBlogData,
    updateBlogError,
  } = useSelector((state) => state.blog.blogReducer);

  useEffect(() => {
    if (blogDetailData?.statusCode === 200) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(blogDetailData?.data?.description)
          )
        )
      );
    }
  }, [blogDetailData]);

  useEffect(() => {
    if(!id || !dispatch) return;
    if (updateBlogData?.statusCode === 200) {
      dispatch(blogDetailAction({ id }));
      setTimeout(() => dispatch(updateBlogResetAction()), 5000);
      window.scroll(0, 0);
    }

    if (updateBlogError?.response) {
      window.scroll(0, 0);
    }
  }, [updateBlogData, updateBlogError]);

  useEffect(() => {
    dispatch(blogDetailAction({ id }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Page</CardTitle>
      </CardHeader>
      <CardBody>
        {updateBlogData?.statusCode === 200 && (
          <div className="text-white bg-success p-1 mb-2">
            <span>{updateBlogData?.message}</span>
          </div>
        )}
        {updateBlogError?.response && (
          <div className="text-white bg-danger p-1 mb-2">
            <span>{`${updateBlogError?.response.status} - ${updateBlogError?.response?.data?.message}`}</span>
          </div>
        )}
        <Formik
          enableReinitialize={true}
          initialValues={{ title: blogDetailData?.data?.title ?? "", image: "" }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Must be 3 characters or more.")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", values.title);
            formData.append(
              "description",
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            if (values.image) {
              formData.append("image", values.image);
            }
            dispatch(updateBlogAction(formData));
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
                    disabled={blogDetailLoading || updateBlogLoading}
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
                <Col md="2">
                  <span>Current Image</span>
                </Col>
                <Col md="10">
                  <FormGroup>
                    <img src={blogDetailData?.data?.image} height={100} />
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <span>Image</span>
                </Col>
                <Col md="10">
                  <FormGroup>
                    <CustomInput
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="customFile"
                      onBlur={formik.handleBlur}
                      onChange={(e) =>
                        formik.setFieldValue("image", e.target.files[0])
                      }
                      disabled={blogDetailLoading || updateBlogLoading}
                    />
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 8, offset: 5 }}>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    {updateBlogLoading ? (
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

export default EditBlogForm;
