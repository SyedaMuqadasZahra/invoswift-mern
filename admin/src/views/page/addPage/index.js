import React from "react"
import {Row, Col} from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AddBlogForm from "./AddPage"

class AddPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Page"
          breadCrumbParent="Page"
          breadCrumbActive="Add Page"
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

export default AddPage
