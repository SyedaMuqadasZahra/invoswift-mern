import React from "react"
import {Row, Col} from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AddBlogForm from "./AddBlog"

class AddBlog extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Blog"
          breadCrumbParent="Blog"
          breadCrumbActive="Add Blog"
        />
        <Row>
          <Col lg="12" md="12">
            <AddBlogForm/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AddBlog
