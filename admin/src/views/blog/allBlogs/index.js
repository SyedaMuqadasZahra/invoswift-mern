import React from "react"
import {Row, Col} from "reactstrap"
import prism from "prismjs"
import TableBasic from "./AllBlogs"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import "prismjs/components/prism-jsx.min"

class Tables extends React.Component {

  componentDidMount() {
    prism.highlightAll()
  }


  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Blog"
          breadCrumbParent="Blog"
          breadCrumbActive="Edit Blog"
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

export default Tables
