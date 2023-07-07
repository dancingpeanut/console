import React, { Component } from 'react'

class AccessLayout extends Component {
  render() {
    const ss = window.location.href.split('/')
    const name = ss[ss.length - 1]
    let url = ''
    globals.config.externalMenu.forEach(c => {
      if (c.name === name) {
        url = c.url
      }
    })
    return (
      <>
        <iframe
          src={url}
          style={{ width: '100%', height: '92vh' }}
          scrolling="yes"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </>
    )
  }
}

export default AccessLayout
