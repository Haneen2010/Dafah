import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { Form , DropdownButton } from 'react-bootstrap';
const ClothesItem = (props) => (
  <tr>
    <td>{props.item.itemName}</td>
    <td>{props.item.category}</td>
    <td>{props.item.type}</td>
    <td>{props.item.description}</td>
    <td>{props.item.phoneNumber}</td>
    <td>
      <img
        src={props.item.image}
        width="200"
        height="200"
        class="w3-round"
        alt="Norway"
      />
    </td>
    <td>
      <Link
      style={{width:120, height:40}}
        to={"/edit/" + props.item._id}
        className="btn btn-deep-orange darken-4"
      >
        Edit
      </Link>
      <button style={{width:120,height:40}}
        type="button"
        className="btn btn-deep-orange darken-4"
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      items: [],
      filteredItems: [],
      SearchString: "",
      category: "",
      type: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/addItems/")
      .then((res) => {
        this.setState({ items: res.data });
        console.log(this.state.items, "hayniiii");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteItem(id) {
    axios
      .delete("http://localhost:3000/addItems/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
    });
  }
  itemsList() {
    let listedItems =
      this.state.filteredItems.length > 0
        ? this.state.filteredItems
        : this.state.items;
    return listedItems.map((currentItem) => {
      return (
        <ClothesItem
          item={currentItem}
          deleteItem={this.deleteItem}
          key={currentItem._id}
        />
      );
    });
  }
  onChangecategory(e) {
    let { items } = this.state;
    let string = e.target.value;
    this.setState({
      category: e.target.value,
    });
    let filteredItems = items.filter((item) => item.category.includes(string));
    this.setState({ filteredItems: filteredItems });
  }
  onChangetype(e) {
    let { filteredItems } = this.state;
    let string = e.target.value;
    this.setState({
      type: e.target.value,
    });
    filteredItems = filteredItems.filter((item) => item.type.includes(string));
    this.setState({ filteredItems: filteredItems });
  }
  render() {
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
          <h2>Clothing</h2>
          <Form>
  <Form.Group controlId="exampleForm.SelectCustomSizeSm"  onChange={this.onChangetype.bind(this)} >
    {/* <Form.Label>Select by type</Form.Label> */}
    <Form.Control as="select"  size="sm" custom style={{width:155, color:'white', border:'orange', margin:"50px 0px 10px 250px", background:'#212121'}} >
    <option value="">Select by type</option>
    <option value="Shoes">Shoes</option>
    <option value="Dress">Dress</option>
    <option value="Jacket">Jacket</option>
    <option value="Blouse">Blouse</option>
    <option value="Gloves">Gloves</option>
    <option value="Hat">Hat</option>
    <option value="Scarf">Scarf</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.SelectCustomSizeSm" >
    {/* <Form.Label>Select by category</Form.Label> */}
    <Form.Control as="select" size="sm" custom onChange={this.onChangecategory.bind(this)} style={{width:155, margin:'-100px 250px 10px 0px', background:'#212121',color:'white'}}>
    <option value="">Select by category</option>
    <option value="Women">Women</option>
    <option value="Men">Men</option>
    <option value="Kids">Kids</option>
    </Form.Control>
  </Form.Group>
</Form>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Type</th>
                <th>Description</th>
                <th>Donor Phone Number</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>{this.itemsList()}</tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(ItemsList);











