/**
 * @fileoverview editor save state
 * @description This file defines functions that saves the state to the backend when the user clicks the save button.
 */

import axios, { AxiosResponse } from "axios";
import { Editor } from "grapesjs";
import ApiRoutes from "../../../../../../routes/backend_routes";
import { IEventLandingPage } from "../../../../../../types";
import { fetchApi } from "../../../../../../utils/api/fetch_api";
import defaultCss from "../../default-css";

interface IContent {
    html: string;
    css: string;
}

export const loadContentFromServer = async (eventID: string) => {
    try {
        const response: AxiosResponse<IEventLandingPage> = await fetchApi(ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_LANDING_PAGE, {
            eventID,
        }), true);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const saveContentToServer = async (eventID: string, content: IContent) => {
    try {
        const response = await axios.put(ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_LANDING_PAGE, {
            eventID,
        }), content, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

export const onSave = async (eventID: string, editor: Editor) => {
    const html = editor.getHtml();
    const css = editor.getCss();


    const content: IContent = {
        html: html,
        css: css || '',
    };

    // Call your API to save the content
    saveContentToServer(eventID, content);
};

export const onLoad = async (eventID: string, editor: Editor) => {
    const content = await loadContentFromServer(eventID);

    if (!content) {
        return;
    }

    editor.setStyle(`${defaultCss} ${content.css}`);
}