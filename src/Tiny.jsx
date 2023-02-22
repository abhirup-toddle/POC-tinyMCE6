import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
const API_KEY = '2lp1uw4bakb9o5wa7nkrmu164p1asxl8b3occ7uszz2r5x73';
import ReactHtmlParser from 'react-html-parser';


export default function Tiny({inline=false}) {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent())
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
    <div className='editor-container'>
      <Editor
        // tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        
        apiKey={API_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<h1>Into the mouth of madness we run, run, run</h1>'
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',  
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          inline: inline,
          setup: (editor) => {
            /* Menu items are recreated when the menu is closed and opened, so we need
               a variable to store the toggle menu item state. */
            let toggleState = false;
            /* example, adding a toolbar menu button */
            editor.ui.registry.addMenuButton('mybutton', {
              text: 'My button',
              fetch: (callback) => {
                const items = [
                  {
                    type: 'menuitem',
                    text: 'Menu item 1',
                    onAction: () => editor.insertContent('&nbsp;<em>You clicked menu item 1!</em>')
                  },
                  {
                    type: 'nestedmenuitem',
                    text: 'Menu item 2',
                    icon: 'user',
                    getSubmenuItems: () => [
                      {
                        type: 'menuitem',
                        text: 'Sub menu item 1',
                        icon: 'unlock',
                        onAction: () => editor.insertContent('&nbsp;<em>You clicked Sub menu item 1!</em>')
                      },
                      {
                        type: 'menuitem',
                        text: 'Sub menu item 2',
                        icon: 'lock',
                        onAction: () => editor.insertContent('&nbsp;<em>You clicked Sub menu item 2!</em>')
                      }
                    ]
                  },
                  {
                    type: 'togglemenuitem',
                    text: 'Toggle menu item',
                    onAction: () => {
                      toggleState = !toggleState;
                      editor.insertContent('&nbsp;<em>You toggled a menuitem ' + (toggleState ? 'on' : 'off') + '</em>');
                    },
                    onSetup: (api) => {
                      api.setActive(toggleState);
                      return () => {};
                    }
                  }
                ];
                callback(items);
              }
            });
          },
        }}
      />
    </div>
      <button onClick={log}>Log editor content</button>
      <div className="output-container">
        <h2>Output</h2>
        {ReactHtmlParser(content)}
      </div>
    </>
  );
}

// Note about adding React Components to TinyMCE -  
// https://stackoverflow.com/questions/51805554/add-react-component-to-tinymce-editor-content