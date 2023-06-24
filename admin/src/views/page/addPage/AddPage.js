import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button, Spinner,
} from "reactstrap";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addPageAction, addPageResetAction} from "../../../redux/actions/page/pageActions";
import {Link} from "react-router-dom";

const AddPageForm = () => {
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {addPageLoading, addPageData, addPageError} = useSelector(state => state.page.pageReducer);

  useEffect(() => {
    if (addPageData?.statusCode === 200) {
      window.scroll(0, 0);
      setTimeout(() => dispatch(addPageResetAction()), 5000);
    }
  }, [addPageData]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Page</CardTitle>
      </CardHeader>
      <CardBody>
        {addPageData?.statusCode === 200 && (
          <div className="text-white bg-success p-1 mb-2">
            <span>{addPageData?.message}</span>
          </div>
        )}
        {addPageError?.response && (
          <div className="text-white bg-danger p-1 mb-2">
            <span>{`${addPageError?.response.status} - ${addPageError?.response?.data?.message}`}</span>
          </div>
        )}
        <Formik
          initialValues={{ title: "" }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Must be 3 characters or more.")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            dispatch(
              addPageAction({
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
                    disabled={addPageLoading}
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
                    disabled={addPageLoading}
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
                    disabled={addPageLoading}
                  >
                    {addPageLoading ? (
                      <>
                        <Spinner color="white" size="sm"/>
                        <span className="ml-50">Submit</span>
                      </>
                    ) : (
                      <span className="ml-50">Submit</span>
                    )}
                  </Button.Ripple>
                  <Link
                    to="/admin/dashboard"
                    className="btn btn-warning"
                  >
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

export default AddPageForm;
