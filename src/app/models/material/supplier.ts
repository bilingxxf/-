export class Supplier {
  accountInfo: number
  address: string
  businessLicense: number
  businessTerm: Date
  city: string
  companyEmail: string
  companyId: number
  country: string = '国家'
  enterpriseNature: string
  firstBankAccount: string
  firstBankName: string
  firstContact: string
  firstContactEmail: string
  firstContactPhone: string
  firstContactTel: string
  legalRepresentative: string
  mainBusiness: string
  name: string
  performanceProve: number
  powerAttorney: number
  region: string
  registeredCapital: string
  registrationDate: Date
  secondBankAccount: string
  secondBankName: string
  secondContact: string
  secondContactEmail: string
  secondContactPhone: string
  secondContactTel: string
  shortName: string
  socialCode: string
  state: string
  supplierClassification: string
  supplierCode: string
  website: string
  id?: number;
  division: any[] = [];
  constructor(params = {}) {
    return Object.assign(this, params)
  }
}