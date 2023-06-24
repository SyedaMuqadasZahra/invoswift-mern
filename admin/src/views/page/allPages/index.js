import React from "react"
import {Row, Col} from "reactstrap"
import prism from "prismjs"
import TableBasic from "./AllPages"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "prismjs/components/prism-jsx.min"

class AllPages extends React.Component {

  componentDidMount() {
    prism.highlightAll()
  }


  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Page"
          breadCrumbParent="Page"
          breadCrumbActive="All Pages"
        />
        <Row>
          <Col sm="12">
            <TableBasic/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AllPages
