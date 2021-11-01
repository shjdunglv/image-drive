import React, { Component, Fragment } from 'react';
import { Storage, API } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
const config = require('../config.json');

export default class Images extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async () => {
//     // add call to AWS API Gateway to fetch products here
//     // then set them in state
//     const apiName = 's3';
// const path = '/upload'; 
// const myInit = { // OPTIONAL
//     headers: {}, // OPTIONAL
//     response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
// };
//     API
//   .post(apiName, path, myInit)
//   .then(response => {
//     // Add your code here
//     console.log(response);

//   })
//   .catch(error => {
//     console.log(error.response);
//  });
    try {
      Storage.list(this.props.auth.identityId+"/") // for listing ALL files without prefix, pass '' instead
      .then(result => this.setState({products:result}))
      .catch(err => console.log(err));
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
    // try {
    //   Storage.list("ap-northeast-1:f8b64057-f25c-42c3-9ec9-df2bbc6c08d8/") // for listing ALL files without prefix, pass '' instead
    //   .then(result => this.setState({products:result}))
    //   .catch(err => console.log(err));
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
  // }
    // try {
    //   Storage.list("common/") // for listing ALL files without prefix, pass '' instead
    //   .then(result => this.setState({products:result}))
    //   .catch(err => console.log(err));
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>画像一覧</h1>
            <p className="subtitle is-5">画像一覧:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <S3Image imgKey={product.key} />)
                      : <div className="tile notification is-warning">画像が無し</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
