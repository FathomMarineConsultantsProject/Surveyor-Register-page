export type Discipline = "deck" | "engine" | "naval" | "other" | ""
export type EmploymentStatus = "self" | "employee" | "owner" | ""

export type Rank =
  | ""
  | "master_mariner"
  | "tow_master"
  | "chief_officer"
  | "second_third_officer"
  | "chief_engineer"
  | "second_engineer"
  | "third_fourth_engineer"
  | "naval_architect"
  | "yacht_master"
  | "relevant_maritime_degree"
  | "other"

export type ExperienceTriple = { years: string; months: string; days: string }
export type Reference = {
  name: string
  contact: string
}

export type FormData = {
  firstName: string
  lastName: string
  phoneNumber: string
  mobileNumber: string
  nationality: string
  employmentStatus: EmploymentStatus
  companyName: string

  email: string
  dobDD: string
  dobMM: string
  dobYYYY: string
  yearStarted: string
  heardAbout: string
  street1: string
  street2: string
  city: string
  postalCode: string
  country: string
  stateRegion: string

  discipline: Discipline
  rank: Rank

  qualifications: string[]
  qualifiedDD: string
  qualifiedMM: string
  qualifiedYYYY: string

  experienceByQualification: Record<string, ExperienceTriple>

  vesselTypes: string[]
  shoresideExperience: string[]
  surveyingExperience: string[]
  vesselTypeSurveyingExperience: string[]
  accreditations: string[]
  coursesCompleted: string[]

  references: Reference[]

  cvFile: File | null
  photoFile: File | null
  inspectionCost: string
  marketingConsent: boolean
  disciplineOther: string
rankOther: string

qualificationsOther: string

vesselTypesOther: string
shoresideExperienceOther: string

surveyingExperienceOther: string
vesselTypeSurveyingExperienceOther: string

accreditationsOther: string
coursesCompletedOther: string

}
