import React from "react"
import {Row, Col} from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import EditPageForm from "./EditPage"

class AddPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Page"
          breadCrumbParent="Page"
          breadCrumbActive="Edit Page"
        />
        <Row>
          <Col lg="12" md="12">
            <EditPageForm/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AddPage
