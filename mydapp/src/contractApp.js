var contract = undefined;
var customProvider = undefined;
var address = "0xb7f7e8ee4239f626c0dd082cd253645c20cb66dd";
var abi = undefined;

var agentAccount = "0x309FBcC506a68611E1C4E4e479B78F2Bd8Dd336A";
var governAccont = "0x2bc6D36B2eC950eF2321f50D98CAe0E87bb70d81";

var testAccount = "0x309FBcC506a68611E1C4E4e479B78F2Bd8Dd336A";

var statusSet = ["New", "Approved", "Rejected", "InProgress", "Resubmit"];
var caseStatus = 0;
var date = new Date().toISOString().slice(0, 10);
var ApplicantName = "";
var PropertyOccupations = "";
var MotorDealerOccupations = "";
var LicenceTerm = 0;
var LicenceNumber = "";
var ContactNumber = 0;
var EmailAddress = "";
var ApplicationFee = 0;
var CheckList = false;
var CriminalCheck = false;
var CoursePass = false;
var DocCheck = false;

var Approval = false;

var AmountToBePaied = 0;
var AmountToBeRefund = 0;

var exchangeRate = 275496244646400;
var nonRefundableFee = 175.6;
var balance = 0;

var searchLicence = "";

function appform_init() {

    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use existing gateway
        window.web3 = new Web3(web3.currentProvider);
    } else {
        alert("No Ethereum interface injected into browser. Read-only access");
    }

    ethereum.enable()
        .then(function (accounts) {
            
        })
        .catch(function (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        })


    //contract abi
    abi = [
        {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor",
            "payable": true
        },
        {
            "inputs": [],
            "name": "CurrentStatus",
            "outputs": [
                {
                    "internalType": "enum RegistryRequest.Status",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getApplicationStatus",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getDate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getApplicantName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getPropertyOccupations",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getMotorDealerOccupations",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getLicenceTerm",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getLicenceNumber",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getContactNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getEmailAddress",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getApplicationFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getCheckList",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getCriminalCheck",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getCoursePass",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getDocumentation",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "setApplicationStatus",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "setDate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "setApplicantName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "setPropertyOccupations",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "setMotorDealerOccupations",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "setLicenceTerm",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "setLicenceNumber",
                    "type": "string"
                }
            ],
            "name": "setApplicationBasicInfo1",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "setContactNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "setEmailAddress",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "setApplicationFee",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "setCheckList",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "setCoursePass",
                    "type": "bool"
                }
            ],
            "name": "setApplicationBasicInfo2",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "setDocumentation",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "setCriminalCheck",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "setCoursePass",
                    "type": "bool"
                }
            ],
            "name": "setValidateInfo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "setApplicationStatus",
                    "type": "string"
                }
            ],
            "name": "setApprovalStatus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "addPaymentToList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "removePaymentFromList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getPaymentByAccount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "addAgentToList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "licence",
                    "type": "string"
                }
            ],
            "name": "getAgentByLicence",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "ad",
                    "type": "address"
                }
            ],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getAmountToBePaid",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getAmountToBeRefund",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "payTheFeeToContract",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "governAccont",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "payAmount",
                    "type": "uint256"
                }
            ],
            "name": "payTheFeeByETH",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [],
            "name": "checkEligibility",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    contract = new web3.eth.Contract(abi, address);
    
    contract.methods.getApplicationStatus().call()
        .then(console.log);
    contract.methods.getDate().call()
        .then(console.log);
    contract.methods.getApplicantName().call()
        .then(console.log);
    // 
    
    contract.methods.getPropertyOccupations().call()
        .then(console.log);
    contract.methods.getMotorDealerOccupations().call()
        .then(console.log);
    //
    contract.methods.getLicenceTerm().call()
        .then(console.log);
    contract.methods.getLicenceNumber().call()
        .then(console.log);

    contract.methods.getContactNumber().call()
        .then(console.log);
    contract.methods.getEmailAddress().call()
        .then(console.log);

    contract.methods.getApplicationFee().call()
        .then(console.log);
    
    contract.methods.getCheckList().call()
        .then(console.log);
    contract.methods.getCriminalCheck().call()
        .then(console.log);
    contract.methods.getCoursePass().call()
        .then(console.log);
    
    contract.methods.getBalance(address).call()
        .then(console.log);

    contract.methods.getBalance(testAccount).call()
        .then(console.log);
    
};

function show_date() {
    document.getElementById("datebar").innerHTML ="Date of submission: " + date;
}

function show_status() {
    //document.getElementById("statusbar").innerHTML = "Status: " + statusSet[caseStatus]; 
}

function fill_form() {
    contract.methods.getApplicantName().call().then(function (result) {
        document.getElementById("setApplicantName").value = result;
    });
    // to be modified
    contract.methods.getLicenceTerm().call().then(function (result) {
        if (result==1) {
            document.getElementById("selectLicenceTerm").options[0].selected = true;
            
        } else {
            document.getElementById("selectLicenceTerm").options[1].selected = true;
            
        }
        
    });

    contract.methods.getLicenceNumber().call().then(function (result) {
        document.getElementById("setLicenceAccount").value = result;
    });
    contract.methods.getContactNumber().call().then(function (result) {
        document.getElementById("setConNumber").value = result;
    });
    contract.methods.getEmailAddress().call().then(function (result) {
        document.getElementById("setConEmail").value = result;
    });
    contract.methods.getApplicationFee().call().then(function (result) {
        document.getElementById("setAmount").value = result;
    });
    contract.methods.getApplicationFee().call().then(function (result) {
        document.getElementById("setAmount").value = result;
        ApplicationFee = result;
    });

    contract.methods.getCheckList().call().then(function (result) {
        CheckList = result
    });
    contract.methods.getCriminalCheck().call().then(function (result) {
        CriminalCheck = result
    });
    contract.methods.getCoursePass().call().then(function (result) {
        CoursePass = result
    });

    var resultStr;
    contract.methods.getApplicationStatus().call().then(function (result) {
        resultStr = result.toString();
        console.log(resultStr);
        if (resultStr == "Approved") {
            caseStatus = 1;
        } else if (resultStr == "Rejected") {
            caseStatus = 2;
        } else if (resultStr == "InProgress") {
            caseStatus = 3;
        } else if (resultStr == "Resubmit") {
            caseStatus = 4;
        }else (
            caseStatus = 0
        )
        
        document.getElementById("statusbar").innerHTML = "Status: " + statusSet[caseStatus];
    });
    load_validation_info();
    
}


function calculate_fee() {
    if (document.getElementById("selectLicenceTerm").value == "1year") {
        document.getElementById("setAmount").value = 1508.60;
    }
    else if (document.getElementById("selectLicenceTerm").value == "3year") {
        document.getElementById("setAmount").value = 2828.60;
    }
};

function set_checklist() {
    var Q1y = document.getElementById('1qY').checked;
    var Q2y = document.getElementById('2qY').checked;
    var Q3y = document.getElementById('3qY').checked;
    var Q4y = document.getElementById('4qY').checked;
    var Q5y = document.getElementById('5qY').checked;
    var Q6y = document.getElementById('6qY').checked;
    var Q7y = document.getElementById('7qY').checked;
    var Q8y = document.getElementById('8qY').checked;
    var Q9y = document.getElementById('9qY').checked;

    if (Q1y && Q2y && Q3y && Q4y && Q5y && Q6y && Q7y && Q8y && Q9y) {
        CheckList = true;
        CoursePass = true;
    } else if (Q9y) {
        CheckList = false;
        CoursePass = true;
    } else {
        CheckList = false;
        CoursePass = false;
    }
}

function set_contract_info() {
    // for setApplicationBasicInfo1()
    ApplicantName = document.getElementById("setApplicantName").value;
    if (document.getElementById("selectLicenceTerm").value == "1year") {
        LicenceTerm = 1;
    } else {
        LicenceTerm = 3;
    }
    var dateNum = date.replaceAll("-","");
    LicenceNumber = "A" + ApplicantName.substring(0, 3).toUpperCase() + LicenceTerm + "00" + dateNum + Math.floor(Math.random() * 10);
    
    
    // for setApplicationBasicInfo2()
    ContactNumber = document.getElementById("setConNumber").value;
    
    
    EmailAddress = document.getElementById("setConEmail").value;
    ApplicationFee = document.getElementById("setAmount").value * 1000;
    
    //CoursePass = false;
}


function submit_form() {
    calculate_fee();
    //console.log(ApplicantName);
    set_checklist();
    set_contract_info();
    // Send application info to smart contract
    contract.methods.setApplicationBasicInfo1(statusSet[3], date, ApplicantName, PropertyOccupations, MotorDealerOccupations, LicenceTerm, LicenceNumber).send({ from: testAccount, gas: 4000000 });
    contract.methods.setApplicationBasicInfo2(ContactNumber, EmailAddress, ApplicationFee, CheckList, CoursePass).send({ from: testAccount, gas: 4000000 });
    
    if (caseStatus == 0) {
        contract.methods.payTheFeeToContract().send({
            from: agentAccount,
            to: address,
            value: web3.utils.toWei((exchangeRate * ApplicationFee / 1000).toString(), 'wei'),
            gas: 4000000
        });
    }
    
};

function set_validation_info() {
    if (document.getElementById('docCheckY').checked) {
        DocCheck = true;
    } else {
        DocCheck = false;
    }
    if (document.getElementById('crimCheckY').checked) {
        CriminalCheck = true;
    } else {
        CriminalCheck = false;
    }
    if (document.getElementById('courseCheckY').checked) {
        CoursePass = true;
    } else {
        CoursePass = false;
    }

}

function load_validation_info() {
    
    contract.methods.getDocumentation().call().then(function (result) {
        if (result) {
            $("input[name = 'docCheck'][value = yes]").attr("checked", true);
        } else if (!result) {
            $("input[name = 'docCheck'][value = no]").attr("checked", true);
        }
    });
    
    contract.methods.getCriminalCheck().call().then(function (result) {
        if (result) {
            $("input[name = 'crimCheck'][value = yes]").attr("checked", true);
        } else if(!result) {
            $("input[name = 'crimCheck'][value = no]").attr("checked", true);
        }
    });

    contract.methods.getCoursePass().call().then(function (result) {
        if (result) {
            $("input[name = 'courseCheck'][value = yes]").attr("checked", true);
        } else if (!result) {
            $("input[name = 'courseCheck'][value = no]").attr("checked", true);
        }
    });
}

function validate_form() {
    set_validation_info();
    contract.methods.setValidateInfo(DocCheck, CriminalCheck, CoursePass).send({ from: testAccount, gas: 4000000 }).then(
        contract.methods.checkEligibility().send({ from: testAccount, gas: 4000000 }).then(function (result) {
            Approval = result;
        })
    );
    
    
    
    
}

function show_case_status() {
    contract.methods.getCheckList().call().then(function (result) {
        CheckList = result
    });
    contract.methods.getCriminalCheck().call().then(function (result) {
        CriminalCheck = result
    });
    contract.methods.getCoursePass().call().then(function (result) {
        CoursePass = result
    });
    if (CheckList && CriminalCheck && CoursePass) {
        Approval = true;
        AmountToBePaied = ApplicationFee;
        AmountToBeRefund = 0;
    } else {
        Approval = false;
        AmountToBePaied = nonRefundableFee;
        AmountToBeRefund = ApplicationFee - AmountToBePaied;
    };
    
    
    console.log(Approval);
    update_case_action_details();
    contract.methods.getBalance(address).call().then(function (result) {
        balance = result;
    });
    
}

function set_payment() {
    
    
    console.log("balance: "+balance);
    
    if (Approval) {
        contract.methods.payTheFeeByETH(governAccont, balance.toString()).send({ from: testAccount, gas: 4000000 });
        contract.methods.setApprovalStatus(statusSet[1]).send({ from: testAccount, gas: 4000000 });
        contract.methods.addAgentToList().send({ from: testAccount, gas: 4000000 });
    }
    else {
        amountRefund = exchangeRate * AmountToBeRefund;
        amountPaid = balance - amountRefund;
        console.log("amountRefund: "+amountRefund);
        console.log("amountPaid: "+amountPaid);
        contract.methods.payTheFeeByETH(governAccont, amountPaid.toString()).send({ from: testAccount, gas: 4000000 });
        contract.methods.payTheFeeByETH(agentAccount, amountRefund.toString()).send({ from: testAccount, gas: 4000000 });
        contract.methods.setApprovalStatus(statusSet[2]).send({ from: testAccount, gas: 4000000 });
    }
    
    
}



function update_case_action_details() {
    if (Approval) {
        document.getElementById("next_action").innerHTML = "Next action: " + "Approved by system";
    } else {
        document.getElementById("next_action").innerHTML = "Next action: " + "Rejected by system";
        document.getElementById("resub_button").style.display = "block";
    }
    
    document.getElementById("amount_charge").innerHTML = "Amount to be charged: " + AmountToBePaied;
    document.getElementById("amount_refund").innerHTML = "Amount to be refund: " + AmountToBeRefund;
    document.getElementById("checklist_result").innerHTML = "Check List: " + CheckList.toString();
    document.getElementById("criminal_result").innerHTML = "Criminal Check: " + CriminalCheck.toString();
    document.getElementById("courses_result").innerHTML = "Required Courses: " + CoursePass.toString();
}

function set_resubmit() {
    contract.methods.setApprovalStatus(statusSet[4]).send({ from: testAccount, gas: 4000000 });
}

function search_agent() {
    searchLicence = document.getElementById("licencenum").value;
   
    contract.methods.getAgentByLicence(searchLicence).call().then(function (result) {
        if (result != "") {
            document.getElementById("searchResultLicence").innerHTML = "Licence Number: " + searchLicence;
            document.getElementById("searchResultName").innerHTML = "Agent Name: " + result;
        } else {
            document.getElementById("searchResultLicence").innerHTML = "Licence Number: NO RECORD" ;
            document.getElementById("searchResultName").innerHTML = "Agent Name: NO RECORD";
        }
    });
    
}



