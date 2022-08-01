import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

const PLUGIN_NAME = 'BlazorAppPlugin';

export default class BlazorAppPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    // publish relevant Flex Actions to Blazor iFrame
    flex.Actions.addListener("afterAcceptTask", (payload, abortFunction) => {
      debugger;
      window.frames[0].postMessage({ flexEvent: "afterAcceptTask", task: payload.task.attributes, conferenceSid: payload.task.taskSid }, "*");
    });
    flex.Actions.addListener("afterSelectTask", (payload, abortFunction) => {
      window.frames[0].postMessage({ flexEvent: "afterSelectTask", task: payload.task.attributes, conferenceSid: payload.task.taskSid }, "*");
    });
    flex.Actions.addListener("afterCompleteTask", (payload, abortFunction) => {
      window.frames[0].postMessage({ flexEvent: "afterCompleteTask", task: "", conferenceSid: ""}, "*");
    });

    // subscribe to events back from Blazor iFrame
    window.addEventListener("message", (event) => {
      // check origin of message for security
      if (event.origin !== "https://localhost:5001")
        return;
      console.log("Blazor event type: ", event.data.blazorEvent);
      if (event.data.blazorEvent == "transfer") {
        flex.Actions.invokeAction("AddNewParticipant", { destination: event.data.phone, conferenceSid: event.data.conferenceSid, callerId : "+19034184605"});
      }
    }, false);
    
    
    // add Blazor App to iFrame
    flex.CRMContainer
      .defaultProps
      .uriCallback = (task) => "https://localhost:5001/";
  }
}
