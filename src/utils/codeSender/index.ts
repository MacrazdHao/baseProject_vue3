import * as EmailCodeSender from './emailCode'
import * as PhoneCodeSender from './phoneCode'

let secondsCount = 60

EmailCodeSender.initEmailVCodeTimer(secondsCount)
PhoneCodeSender.initPhoneVCodeTimer(secondsCount)

export default {
  setDelay: (delay: number) => { secondsCount = delay },
  sendEmailVCode: EmailCodeSender.sendEmailVCode,
  sendPhoneVCode: PhoneCodeSender.sendPhoneVCode
}