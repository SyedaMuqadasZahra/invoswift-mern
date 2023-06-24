import React, {useEffect, useState} from "react";
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
  CustomInput, Spinner,
} from "reactstrap";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import {convertToRaw, EditorState} from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import {addBlogAction, addBlogResetAction} from "../../../redux/actions/blog/blogActions";
import draftToHtml from "draftjs-to-html";
import {addPageResetAction} from "../../../redux/actions/page/pageActions";

const AddBlogForm = () => {
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const RESOURCE_COVER_MAX_SIZE = 1 * 1024 * 1024;
  const RESOURCE_COVER_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const { addBlogLoading, addBlogData, addBlogError } = useSelector(
    (state) => state.blog.blogReducer
  );

  useEffect(() => {
    if (addBlogData?.statusCode === 200) {
      window.scroll(0, 0);
      setTimeout(() => dispatch(addBlogResetAction()), 5000);
    }
  }, [addBlogData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Blog</CardTitle>
      </CardHeader>
      <CardBody>
        {addBlogData?.statusCode === 200 && (
          <div className="text-white bg-success p-1 mb-2">
            <span>{addBlogData?.message}</span>
          </div>
        )}
        {addBlogError?.response && (
          <div className="text-white bg-danger p-1 mb-2">
            <span>{`${addBlogError?.response.status} - ${addBlogError?.response?.data?.message}`}</span>
          </div>
        )}
        <Formik
          initialValues={{ title: "", image: "" }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Must be 3 characters or more.")
              .required("This field is required."),
            image: Yup.mixed()
              .required("This field is required.")
              .test(
                "fileFormat",
                "Unsupported Format",
                (value) => value && RESOURCE_COVER_FORMATS.includes(value.type)
              )
              .test(
                "fileSize",
                "File too large",
                (value) => value && value.size <= RESOURCE_COVER_MAX_SIZE
              ),
          })}
          onSubmit={(values) => {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())))
            formData.append('image', values.image)
            dispatch(addBlogAction(formData));
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
                    name="name"
                    id="name"
                    placeholder="First Name"
                    {...formik.getFieldProps("title")}
                    disabled={addBlogLoading}
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
                      disabled={addBlogLoading}
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="text-danger font-small-2">
                        {formik.errors.image}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 8, offset: 5 }}>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    disabled={addBlogLoading}
                  >
                    {addBlogLoading ? (
                      <>
                        <Spinner color="white" size="sm"/>
                        <span className="ml-50">Submit</span>
                      </>
                    ) : (
                      <span className="ml-50">Submit</span>
                    )}
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                    href="/admin/dashboard"
                  >
                    Cancel
                  </Button.Ripple>
                </Col>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default AddBlogForm;
