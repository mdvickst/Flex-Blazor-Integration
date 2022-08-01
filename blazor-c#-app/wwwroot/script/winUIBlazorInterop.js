var interopFunctions = {};

interopFunctions.registerIndexComponent = (dotnetObj) => {
    interopFunctions.indexComponent = dotnetObj;
};

interopFunctions.setFromNumber = (number) => {
    console.log("JavaScript setFromNumber executed");

    interopFunctions.indexComponent.invokeMethodAsync('SetFromNumber', number);
};

interopFunctions.setConferenceSid = (confSid) => {
    console.log("JavaScript setConferenceSid executed");

    interopFunctions.indexComponent.invokeMethodAsync('SetConferenceSid', confSid);
};

interopFunctions.setCustomerName = (name) => {
    console.log("JavaScript setcustomerName executed");

    interopFunctions.indexComponent.invokeMethodAsync('SetCustomerName', name);
};

interopFunctions.initiateTransfer = (phoneNumber, conferenceSid) => {
  console.log("JavaScript initiateTransfer executed");

    // send transfer event to Flex

    window.parent.postMessage({
        blazorEvent: 'transfer',
        phone: phoneNumber,
        conferenceSid: conferenceSid
    }, "*");
};

// listen for published Flex tasks

window.addEventListener("message", (event) => {
    console.log(event);
    if (event.origin == "http://localhost:3000" || event.origin == "https://flex.twilio.com") {
        console.log("blazor received: ", event.data);

        if (event.data.flexEvent == "afterAcceptTask" || event.data.flexEvent == "afterSelectTask") {
            interopFunctions.setFromNumber(event.data.task.called);
            interopFunctions.setCustomerName(event.data.task.customer);
            interopFunctions.setConferenceSid(event.data.conferenceSid);
        } else if (event.data.flexEvent == "afterCompleteTask") {
            interopFunctions.setFromNumber("");
            interopFunctions.setCustomerName("");
            interopFunctions.setConferenceSid("");
        }
    }
}, false);