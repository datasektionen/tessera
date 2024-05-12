/**
 * @fileoverview editor save state
 * @description This file defines functions that saves the state to the backend when the user clicks the save button.
 */

import { Editor } from "grapesjs";

interface IContent {
    html: string;
    css: string;
}

const saveContentToServer = async (content: IContent) => {
    try {
        const response = await fetch('http://localhost:8080/savePage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (response.ok) {
            console.log('Page saved successfully');
        } else {
            throw new Error('Failed to save the page');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const onSave = (editor: Editor) => {
    const html = editor.getHtml();
    const css = editor.getCss();
    const content: IContent = {
        html: html,
        css: css || '',
    };

    // Call your API to save the content
    saveContentToServer(content);
};