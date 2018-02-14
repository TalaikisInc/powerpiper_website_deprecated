import { Component } from 'react'
import CKEditor from 'react-ckeditor-component'

import Button from 'grommet/components/Button'

import Layout from '../layout'
import hoc from '../utils/hoc'

class Editor extends Component {
  constructor(props) {
    super(props)
    this._updateContent = this._updateContent.bind(this)
    this.state = {
      title: '',
      slug: '',
      content: ''
    }
  }

  _updateContent = (newContent) => {
    this.setState({
      content: newContent
    })
  }

  _updateTitle = (title) => {
    this.setState({
      title: title
      // make slug here
    })
  }

  _onChange = (e) => {
    this.setState({
      content: e.editor.getData()
    })
  }

  _handleSave = () => {
    this.props.dispatch(Actions.requestSavePost(this.state));
  }

  _onBlur = (e) => {
    console.log('onBlur event called with event info: ', evt)
  }

  _afterPaste = (e) => {
    console.log('afterPaste event called with event info: ', evt)
  }

  render() {
    return (
      <Layout {...this.props}>
        <input name="title" value={this.state.title} onChange={this._updateTitle}/>
        <input name="slug" type="hidden" value={this.state.slug} />
        <CKEditor
          activeClass="p10"
          content={this.state.content}
          events={{
            blur: this._onBlur,
            afterPaste: this._afterPaste,
            change: this._onChange
          }} />
        <Button onClick={this._handleSave} label='Save' />
      </Layout>
    )
  }
}

export default hoc({}, state => state)(Editor)
