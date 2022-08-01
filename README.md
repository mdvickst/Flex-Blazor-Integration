# Flex-Blazor-Integration
An example Blazor Application with a Flex Plugin to demonstrate how to integrate the two. 

## Blazor App
[/blazor-c#-app](/blazor-c%23-app) is a sample Blazor application written in C#. It has two sections, Customer Information and Next Actions. 

### Customer information 
will display the customers number and name passed into Flex as attributes. Here is a sample of the attributes that would be passed in via Studio in the "Send to Flex" widget. 
```json
{
  "customer": "ACME Inc.", 
  "phone": "{{flow.channel.address}}"
}
```
This demonstrates how to send data from Flex Actions framework to an embedded iFrame. 

### Next Actions
The next actions section accepts an E.164 phone number to transfer the call too. This assumes Flex has the [flex-dialpad-addon](https://github.com/twilio-professional-services/flex-dialpad-addon-plugin) installed. 

This is an example of the Blazor app passing data back to the Flex agent UI parent window. 



## Blazor Plugin
(/blazor-plugin)[/blazor-plugin] contains the Flex Plugin which loads the Blazor C# App running locally at http://localhost:5001 into the CRM panel. It connects follow Flex Actions to the Blazor app using window.postMessage() javascript method:
- **afterAcceptTask**: After the agent accepts a task, post a message to the Blazor iFrame with the task attributes, conferenceSid and taskSid
- **afterSelectTask**: If the agent slects a different task, post a message to the Blazor iFrame with the new tasks attributes, conferenceSid and taskSid
- **afterCompleteTask**: Once the task is completed, send a message to the Blzaor iFrame to clear out the task and conference info. 

# Running Locally
Open the [/blazor-c#-app](/blazor-c%23-app) in Visual Studio and run the project in debug mode. It should load the page at http://localhost:5001.

