import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              ホーム
            </a>
            <a href="/images" className="navbar-item">
              画像一覧
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
            {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  {this.props.auth.user.username}
                </p>
              )}
              {
                !this.props.auth.isAuthenticated && (
                  <div className="buttons">
                  <a href="/register" className="button is-primary">
                    <strong>登録</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    ログイン
                  </a>
                </div>
                )
              }

            </div>
          </div>
        </div>
      </nav>
    )
  }
}
