import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import _isEmpty from 'lodash/isEmpty';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor(props) {
    const [editorStateValue, setSditorStateValue] = useState(EditorState.createEmpty());
    const [charLength, setCharLength] = useState(0);

    useEffect(() => {
        getCharsLength(props.editorVal);
    }, [props.editorVal]);
    useEffect(() => {
        const { editorVal } = props;
        if (!_isEmpty(props.resetValue)) {
            setSditorStateValue(htmlToDraftState(editorVal));
            props.onEditorContentChange(editorVal, getCharsLength(editorVal));
        }
    }, [props]);
    useEffect(() => {
        const { editorVal } = props;
        getCharsLength(editorVal);
    }, [props]);
    useEffect(() => {
        if (props.emptyValue) {
            setSditorStateValue(EditorState.createEmpty());
        }
    }, [props.emptyValue]);
    const getCharsLength = editorVal => {
        let editorStateValue = htmlToDraftState(editorVal);
        let charLength = getEditorTextLength(convertToRaw(editorStateValue.getCurrentContent()));
        setSditorStateValue(editorStateValue);
        setCharLength(charLength);
        return charLength;
    };

    const _handleBeforeInput = () => {
        const { maxLength } = props;
        if (maxLength && charLength > maxLength - 1) {
            return 'handled';
        }
    };

    const _handlePastedText = pastedText => {
        const { maxLength } = props;
        if (maxLength && charLength + pastedText.length > maxLength) {
            return 'handled';
        }
    };

    const onEditorStateChange = editorStateValue => {
        const { maxLength, onEditorContentChange } = props;
        let chars = convertToRaw(editorStateValue.getCurrentContent());
        let charLength = getEditorTextLength(chars);
        if (maxLength) {
            if (charLength <= maxLength) {
                setSditorStateValue(editorStateValue);
                setCharLength(charLength);
                onEditorContentChange(draftToHtml(chars).replace(/\n/g, ''), charLength);
            }
        } else {
            setSditorStateValue(editorStateValue);
            setCharLength(charLength);
            onEditorContentChange(draftToHtml(chars).replace(/\n/g, ''), charLength);
        }
        if (!charLength) onEditorContentChange('', charLength);
    };

    const { maxLength, onEditorContentChange, isSlimEditor = false, ...restProps } = props;
    return (
        <Fragment>
            <Editor
                toolbar={
                    isSlimEditor
                        ? {
                              options: ['inline', 'list', 'blockType'],
                              inline: {
                                  options: ['bold', 'italic'],
                                  className: 'col-md-2 mt-0 flex-nowrap',
                                  bold: {
                                      className: 'col-md-6 m-0'
                                  },
                                  italic: { className: 'col-md-6 m-0' }
                              },
                              list: {
                                  options: ['unordered', 'ordered'],
                                  className: 'col-md-2 mt-0 flex-nowrap',
                                  unordered: { className: 'col-md-6 m-0' },
                                  ordered: { className: 'col-md-6 m-0' }
                              },
                              blockType: {
                                  inDropdown: false,
                                  className: 'col-md-3 mt-0',
                                  options: ['Blockquote']
                              }
                          }
                        : {}
                }
                editorState={editorStateValue}
                editorClassName="editor-content"
                toolbarClassName="editor-toolbar"
                wrapperClassName="editor-container"
                handlePastedText={_handlePastedText}
                handleBeforeInput={_handleBeforeInput}
                onEditorStateChange={onEditorStateChange}
                {...restProps}
            />
            {maxLength ? (
                <Typography variant="caption">{maxLength - charLength} characters remaining</Typography>
            ) : null}
        </Fragment>
    );
}

function htmlToDraftState(html) {
    if (!html) return EditorState.createEmpty();
    const blocksFromHtml = htmlToDraft(html);
    if (blocksFromHtml) {
        const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
        return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
}

function getEditorTextLength(content) {
    let toStr = '';
    if (content) {
        let length = content.blocks.length;
        for (var i = 0; i < length; i++) {
            toStr += content.blocks[i].text + ' ';
        }
    }
    return toStr.length - 1;
}
export default TextEditor;
