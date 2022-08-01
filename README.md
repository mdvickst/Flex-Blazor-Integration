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


/blazor-plugin contains the Flex Plugin which loads
