import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import * as moment from 'moment'

export enum AppealType {
  JOIN = 'join',
  REVALIDATION = 'revalidation',
}

export const appealYearGap = {
  [AppealType.JOIN]: 1,
  [AppealType.REVALIDATION]: 2,
}

export const MAX_APPEAL_ENTRIES_COUNT = 100

export const BEGIN_IPN_DATE = '1900-01-01'

const ipnAlgorithmSteps = ['$num*(-1)', '$num*5', '$num*7', '$num*9', '$num*4', '$num*6', '$num*10', '$num*5', '$num*7']

const ipnCalculation = (ipnArray: number[], curNumber = 0, stepIndex = 0): number => {
  if (stepIndex === ipnAlgorithmSteps.length) {
    return curNumber
  }

  const indexedNumber = ipnArray[stepIndex]
  const stringExpression = ipnAlgorithmSteps[stepIndex].replace('$num', indexedNumber.toString())
  const evaledNum = eval(stringExpression)
  const newCurNumber = curNumber + evaledNum

  return ipnCalculation(ipnArray, newCurNumber, stepIndex + 1)
}

export const isValidAgeToIpn = (age: number, ipn: number): boolean => {
  const ipnStirng = new String(ipn)

  const currDate = moment()

  const birthDays = parseInt(ipnStirng.slice(0, 5))
  const birthIndex = parseInt(ipnStirng.slice(5, 9))

  if (birthIndex > 5000) {
    return true
  }

  const ipnMoment = moment(BEGIN_IPN_DATE).add(birthDays, 'days')
  const ipnAge = Math.abs(ipnMoment.diff(currDate, 'years'))

  return ipnAge === age
}

@ValidatorConstraint({ name: 'isValidIPN', async: false })
export class IsValidIPN implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    const stringIpn = new String(value)
    const ipnArray = Array.from(stringIpn, Number)

    if (ipnArray.length !== 10) {
      return false
    }

    const X = ipnCalculation(ipnArray)
    const controlNumber = X % 11

    return !(controlNumber < 0 || controlNumber > 10)
  }

  defaultMessage(): string {
    return 'Provided invalid IPN'
  }
}
