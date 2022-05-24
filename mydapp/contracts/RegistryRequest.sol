pragma solidity >=0.4.22 <0.9.0;


contract RegistryRequest{

    enum Status { New, Approved, Rejected, InProgress, Resubmit }

    Status public CurrentStatus;

    address AgentAccont;
    address payable GovernAccont;
    address ContractAccont;

    // Agent Registry
    string ApplicationStatus;
    string Date;
    string ApplicantName;

    string PropertyOccupations;
    string MotorDealerOccupations;

    uint LicenceTerm;

    string LicenceNumber;


    uint ContactNumber;
    string EmailAddress;


    uint ApplicationFee;

    // Checklist values
    bool CheckList;
    bool CriminalCheck;
    bool CoursePass;

    bool Documentation;

    // If the application is eligible
    bool Eligibility;

    // string[] ;
    mapping (address => uint) paymentAmount; //first value is address, 2nd value is the payment amount
    // Payed list
    mapping (address => uint) payedList; //first value is address, 2nd value is the payment amount
    // Licence Number list
    mapping (string => string) licenceList; //first value is licence, 2nd value is the agent name

    uint amountToBePaid;
    uint amountToBeRefund = 0;


    constructor () public payable {
        licenceList["AAGE0000001"] = "AGENT1";
        licenceList["AAGE0000002"] = "AGENT2";
    }

    // Agent Application Section function
    function getApplicationStatus() public view returns (string memory) {
        return ApplicationStatus;
    }

    function getDate() public view returns (string memory) {
        return Date;
    }

    function getApplicantName() public view returns (string memory) {
        return ApplicantName;
    }

    function getPropertyOccupations() public view returns (string memory) {
        return PropertyOccupations;
    }

    function getMotorDealerOccupations() public view returns (string memory) {
        return MotorDealerOccupations;
    }

    function getLicenceTerm() public view returns (uint) {
        return LicenceTerm;
    }

    function getLicenceNumber() public view returns (string memory) {
        return LicenceNumber;
    }

    function getContactNumber() public view returns (uint) {
        return ContactNumber;
    }

    function getEmailAddress() public view returns (string memory) {
        return EmailAddress;
    }

    function getApplicationFee() public view returns (uint) {
        return ApplicationFee;
    }


    function getCheckList() public view returns (bool) {
        return CheckList;
    }

    function getCriminalCheck() public view returns (bool) {
        return CriminalCheck;
    }

    function getCoursePass() public view returns (bool) {
        return CoursePass;
    }

    function getDocumentation() public view returns (bool) {
        return Documentation;
    }

    /*
    function getEligibility() public view returns (bool) {
        return Eligibility;
    }
    */

    

    function setApplicationBasicInfo1(string memory setApplicationStatus, string memory setDate, string memory setApplicantName, string memory setPropertyOccupations, string memory setMotorDealerOccupations, uint setLicenceTerm, string memory setLicenceNumber) public {
      ApplicationStatus = setApplicationStatus;
      Date = setDate;
	    ApplicantName = setApplicantName;
      PropertyOccupations = setPropertyOccupations;
      MotorDealerOccupations = setMotorDealerOccupations;
	    LicenceTerm = setLicenceTerm;
	    LicenceNumber = setLicenceNumber;
    }

    function setApplicationBasicInfo2(uint setContactNumber, string memory setEmailAddress, uint setApplicationFee, bool setCheckList, bool setCoursePass) public {
      ContactNumber = setContactNumber;
	    EmailAddress = setEmailAddress;
	    ApplicationFee = setApplicationFee / 1000;
	    CurrentStatus = Status.New;
	    CheckList = setCheckList;
      //CriminalCheck = setCriminalCheck;
      CoursePass = setCoursePass;
    }

    function setValidateInfo(bool setDocumentation, bool setCriminalCheck, bool setCoursePass) public {
      Documentation = setDocumentation;
      CriminalCheck = setCriminalCheck;
      CoursePass = setCoursePass;
    }

    function setApprovalStatus(string memory setApplicationStatus) public {
        ApplicationStatus = setApplicationStatus;
    }

    function addPaymentToList(address account,uint amount) public{
        paymentAmount[account] =  amount;

    }

    function removePaymentFromList(address account) public{
        delete paymentAmount[account];
    }

    function getPaymentByAccount(address account) public view returns (uint) {
        return paymentAmount[account];
    }

    function addAgentToList() public{
        licenceList[LicenceNumber] =  ApplicantName;

    }

    function getAgentByLicence(string memory licence) public view returns (string memory) {
        return licenceList[licence];
    }

    function getBalance(address ad) public view returns (uint) {
        return ad.balance;
    }

    function getAmountToBePaid() public view returns (uint) {
        return amountToBePaid;
    }

    function getAmountToBeRefund() public view returns (uint) {
        return amountToBeRefund;
    }

    function payTheFeeToContract() public payable {

	}

    function payTheFeeByETH(address payable governAccont, uint payAmount) public payable returns (bool) {

		
        address myAddress = address(this);

        if (myAddress.balance >= 0) {
            governAccont.transfer(payAmount);
        }
        return true;
		
	}


	function checkEligibility() public returns (bool) {
      if (CheckList && CriminalCheck && CoursePass) {
        Eligibility = true;
      } else {
        Eligibility = false;
      }
      return Eligibility;
    }

/*
    function approveApplication() public payable {
        if(checkEligibility()) {
            CurrentStatus = Status.Approved;

        } else {
            CurrentStatus = Status.Rejected;
        }
        calculateApplicationFee();
        addPaymentToList(AgentAccont, amountToBePaid);
        payTheFeeByETH(GovernAccont,amountToBePaid);
        
        if (amountToBeRefund != 0) {
          addPaymentToList(AgentAccont, amountToBeRefund);
          payTheFeeByETH(AgentAccont, amountToBeRefund);
        }
        

    }
  
    function rejectApplication() public {
        CurrentStatus = Status.Rejected;
    }
*/
    
}
