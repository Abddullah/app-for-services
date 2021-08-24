import axios from 'axios';



export function sendEmailAPI(recipientEmail) {
  return axios({
    method: 'post',
    url: 'https://us-central1-app-for-services.cloudfunctions.net/sendEmail',
    data: {
      recepientEmail: recipientEmail,
    }
  });
}

export function sendJobDataInEmailAPI(recipientEmail, jobData) {
  // console.log( jobData,"jobdataaaaaaaaaaaa")
  // console.log(recipientEmail,"recipientEmailllllllllllllll")
  let URL = 'https://us-central1-app-for-services.cloudfunctions.net/sendJobDataInEmailAPI';
  return axios({
    method: 'post',
    url: URL,
    data: {
      recepientEmail: recipientEmail,
      jobData: jobData
    }
  });
}

export function sendPrDataInEmailAPI(recipientEmail, PrData) {



  let PRobj = {}


  Object.keys(PrData).map((optionName, index) => {
    let optionValues = PrData[optionName]


    console.log(optionName, "ssssaaaaaaaaass", optionValues, PRobj)

    for (var i = 0; i < optionValues.length; i++) {

      let dropdownOption = optionValues[i];

      if (optionValues[i].selected === true) {
        let validOption = dropdownOption.optionName

        PRobj[optionName] = validOption
        onName = validOption
      }

    }

  })


  let PRaditionalObj = PrData.prAdditionalDataArr[0]
  console.log(PRaditionalObj, "llllllllllllll")
  for (var key in PRaditionalObj) {
    console.log(key, "asasasasas", PRaditionalObj[key])
    if (PRaditionalObj[key] !== "" && PRaditionalObj[key] !== []) {
      PRobj[key] = PRaditionalObj[key]
    }
  }


  console.log(PrData, "prrrrrrrrrrrrrr", PRobj)
  console.log(recipientEmail, "recipientEmailllllllllllllll")
  let URL = 'https://us-central1-app-for-services.cloudfunctions.net/sendPrDataInEmailAPI';
  return axios({
    method: 'post',
    url: URL,
    data: {
      recepientEmail: recipientEmail,
      PrData: PRobj
    }
  });
}


export function sendReportDataInEmailAPI(recipientEmail, report, emailOfJob) {




  let URL = 'https://us-central1-app-for-services.cloudfunctions.net/sendReportDataInEmailAPI';
  return axios({
    method: 'post',
    url: URL,
    data: {
      recepientEmail: recipientEmail,
      ReportData: report,
      emailOfJob: emailOfJob
    }
  });
}
