# Flex-Blazor-Integration
An example Blazor Application with a Flex Plugin to demonstrate how to integrate the two. 

## Blazor App
[/blazor-c#-app](/blazor-c#-app) is a sample Blazor application written in C#. It has two sections, Customer Information and Next Actions. 

###Customer information 
will display the customers number and name passed into Flex as attributes. 
```json
{"reason":"Donation", "donation_amount": "{{widgets.CollectAmount.Digits}}", "customer": "{{trigger.parent.parameters.customer_name}} ", "phone": "{{flow.channel.address}}"}
```


/blazor-plugin contains the Flex Plugin which loads
