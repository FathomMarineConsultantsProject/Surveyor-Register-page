import React, { useMemo, useState } from "react"
import { API_URL } from "./formConstants"
import type { FormData, ExperienceTriple } from "./formTypes"

const emptyExp = (): ExperienceTriple => ({ years: "", months: "", days: "" })

export const initialState: FormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  mobileNumber: "",
  nationality: "",
  employmentStatus: "",
  companyName: "",

  email: "",
  dobDD: "",
  dobMM: "",
  dobYYYY: "",
  yearStarted: "",
  heardAbout: "",
  street1: "",
  street2: "",
  city: "",
  postalCode: "",
  country: "",
  stateRegion: "",

  discipline: "",
  rank: "",

  qualifications: [],
  qualifiedDD: "",
  qualifiedMM: "",
  qualifiedYYYY: "",

  experienceByQualification: {},

  vesselTypes: [],
  shoresideExperience: [],
  surveyingExperience: [],
  vesselTypeSurveyingExperience: [],
  accreditations: [],
  coursesCompleted: [],

  // ✅ NEW (2 mandatory by default)
  references: [
    { name: "", contact: "" },
    { name: "", contact: "" },
  ],

  cvFile: null,
  photoFile: null,
  inspectionCost: "",
  marketingConsent: false,
  disciplineOther: "",
rankOther: "",

qualificationsOther: "",

vesselTypesOther: "",
shoresideExperienceOther: "",

surveyingExperienceOther: "",
vesselTypeSurveyingExperienceOther: "",

accreditationsOther: "",
coursesCompletedOther: "",

}

export function useSurveyorForm() {
  const [formData, setFormData] = useState<FormData>(initialState)
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const showCompanyName = useMemo(
    () => formData.employmentStatus === "employee" || formData.employmentStatus === "owner",
    [formData.employmentStatus]
  )

  function validate(data: FormData) {
    const e: Record<string, string> = {}

    const req = (key: keyof FormData, msg: string) => {
      const val = data[key]
      if (typeof val === "string" && !val.trim()) e[String(key)] = msg
    }
    const nameRegex = /^[a-zA-Z\s'-]+$/
    const phoneRegex = /^[0-9+\-\s()]+$/

    req("firstName", "First name is required.")
    req("lastName", "Last name is required.")
    req("phoneNumber", "Phone number is required.")
    req("nationality", "Nationality is required.")
    req("employmentStatus", "Please select employment status.")
    req("email", "Email is required.")
    req("dobDD", "DOB day is required.")
    req("dobMM", "DOB month is required.")
    req("dobYYYY", "DOB year is required.")
    req("heardAbout", "Please select how you heard about Fathom.")
    req("street1", "Street address is required.")
    req("city", "City is required.")
    req("postalCode", "Postal code is required.")
    req("country", "Country is required.")
    req("stateRegion", "State/Region is required.")
    req("discipline", "Discipline is required.")
    req("rank", "Rank is required.")
    req("qualifiedDD", "Qualified day is required.")
    req("qualifiedMM", "Qualified month is required.")
    req("qualifiedYYYY", "Qualified year is required.")
    req("inspectionCost", "Inspection cost is required.")
    // ✅ Name validation
  if (data.firstName.trim() && !nameRegex.test(data.firstName.trim())) {
    e.firstName = "First name must contain letters only (no numbers)."
  }
  if (data.lastName.trim() && !nameRegex.test(data.lastName.trim())) {
    e.lastName = "Last name must contain letters only (no numbers)."
  }

  // ✅ Phone validation
  if (data.phoneNumber.trim() && !phoneRegex.test(data.phoneNumber.trim())) {
    e.phoneNumber = "Phone number must contain digits only (optional + at start)."
  }
  if (data.mobileNumber.trim() && !phoneRegex.test(data.mobileNumber.trim())) {
    e.mobileNumber = "Mobile number must contain digits only (optional + at start)."
  }

    if ((data.employmentStatus === "employee" || data.employmentStatus === "owner") && !data.companyName.trim()) {
      e.companyName = "Company name is required."
    }

    if (!data.qualifications.length) e.qualifications = "Select at least one qualification."
    if (!data.vesselTypes.length) e.vesselTypes = "Select at least one vessel type."
    if (!data.cvFile) e.cvFile = "CV file is required."
    if (!data.photoFile) e.photoFile = "Photo is required."

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      e.email = "Enter a valid email."
    }

    const dd = Number(data.dobDD), mm = Number(data.dobMM), yy = Number(data.dobYYYY)
    if (data.dobDD && (dd < 1 || dd > 31)) e.dobDD = "Day must be 1-31."
    if (data.dobMM && (mm < 1 || mm > 12)) e.dobMM = "Month must be 1-12."
    if (data.dobYYYY && (String(data.dobYYYY).length !== 4 || yy < 1900)) e.dobYYYY = "Enter a valid year."

    const qdd = Number(data.qualifiedDD), qmm = Number(data.qualifiedMM), qyy = Number(data.qualifiedYYYY)
    if (data.qualifiedDD && (qdd < 1 || qdd > 31)) e.qualifiedDD = "Day must be 1-31."
    if (data.qualifiedMM && (qmm < 1 || qmm > 12)) e.qualifiedMM = "Month must be 1-12."
    if (data.qualifiedYYYY && (String(data.qualifiedYYYY).length !== 4 || qyy < 1900)) e.qualifiedYYYY = "Enter a valid year."

    // ✅ EXPERIENCE VALIDATION
    for (const q of data.qualifications) {
      const exp = data.experienceByQualification[q]
      if (!exp || (!exp.years && !exp.months && !exp.days)) {
        e[`exp_${q}`] = "Enter experience for this qualification."
      }
    }

    // ✅ REFERENCES VALIDATION (first 2 mandatory)
    for (let i = 0; i < 2; i++) {
      const r = data.references?.[i]
      if (!r?.name?.trim()) e[`ref_${i}_name`] = `Reference ${i + 1} name is required.`
      if (!r?.contact?.trim()) e[`ref_${i}_contact`] = `Reference ${i + 1} contact is required.`
    }

    // ✅ EXTRA REFERENCES: if any field filled, require both
    for (let i = 2; i < data.references.length; i++) {
      const r = data.references[i]
      const hasAny = !!r.name.trim() || !!r.contact.trim()
      if (hasAny) {
        if (!r.name.trim()) e[`ref_${i}_name`] = `Reference ${i + 1} name is required.`
        if (!r.contact.trim()) e[`ref_${i}_contact`] = `Reference ${i + 1} contact is required.`
      }
    }if (formData.discipline === "other" && !formData.disciplineOther.trim())
    errors.disciplineOther = "Please specify your discipline."

  if (formData.rank === "other" && !formData.rankOther.trim())
    errors.rankOther = "Please specify your rank."

  if (formData.qualifications.includes("Other") && !formData.qualificationsOther.trim())
    errors.qualificationsOther = "Please specify your qualification."

  if (formData.vesselTypes.includes("Other") && !formData.vesselTypesOther.trim())
    errors.vesselTypesOther = "Please specify the vessel type."

  if (formData.shoresideExperience.includes("Other") && !formData.shoresideExperienceOther.trim())
    errors.shoresideExperienceOther = "Please specify shoreside experience."

  if (formData.surveyingExperience.includes("Other") && !formData.surveyingExperienceOther.trim())
    errors.surveyingExperienceOther = "Please specify surveying experience."

  if (
    formData.vesselTypeSurveyingExperience.includes("Other") &&
    !formData.vesselTypeSurveyingExperienceOther.trim()
  )
    errors.vesselTypeSurveyingExperienceOther = "Please specify vessel types surveyed."

  if (formData.accreditations.includes("Other") && !formData.accreditationsOther.trim())
    errors.accreditationsOther = "Please specify accreditation."

  if (formData.coursesCompleted.includes("Other") && !formData.coursesCompletedOther.trim())
    errors.coursesCompletedOther = "Please specify course."

  return errors
}

  function clearError(key: string) {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
  }

  // ✅ REFERENCES HANDLERS
  function addReference() {
    setFormData((prev) => ({
      ...prev,
      references: [...prev.references, { name: "", contact: "" }],
    }))
  }

  function removeReference(index: number) {
    if (index < 2) return // keep first 2 mandatory

    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }))

    setErrors((prev) => {
      const copy = { ...prev }
      delete copy[`ref_${index}_name`]
      delete copy[`ref_${index}_contact`]
      return copy
    })
  }

  function updateReference(index: number, field: "name" | "contact", value: string) {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
    }))
    clearError(`ref_${index}_${field}`)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    setFormData((prev) => {
      const next = { ...prev, [name]: value } as FormData
      if (name === "employmentStatus" && value === "self") next.companyName = ""
      return next
    })

    clearError(name)
    if (name === "employmentStatus") clearError("companyName")
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target

    setFormData((prev) => {
      const qualifications = checked ? [...prev.qualifications, value] : prev.qualifications.filter((v) => v !== value)

      const experienceByQualification = { ...prev.experienceByQualification }
      if (checked) experienceByQualification[value] = experienceByQualification[value] ?? emptyExp()
      else delete experienceByQualification[value]

      return { ...prev, qualifications, experienceByQualification }
    })

    clearError("qualifications")
    clearError(`exp_${value}`)
  }

  function handleExperienceChange(
  qualification: string,
  field: "years" | "months" | "days",
  value: string
) {
  let cleaned = value.replace(/\D/g, "")

  // limit length
  if (field === "years") cleaned = cleaned.slice(0, 2)   // 0-99 years
  else cleaned = cleaned.slice(0, 2)                     // 0-99 but we clamp below

  // clamp ranges
  let num = cleaned === "" ? "" : String(Number(cleaned))

  if (num !== "") {
    const n = Number(num)

    if (field === "months") num = String(Math.min(Math.max(n, 0), 11)) // 0-11
    if (field === "days") num = String(Math.min(Math.max(n, 0), 30))   // 0-30
    if (field === "years") num = String(Math.min(Math.max(n, 0), 99))  // 0-99
  }

  setFormData((prev) => ({
    ...prev,
    experienceByQualification: {
      ...prev.experienceByQualification,
      [qualification]: {
        years: prev.experienceByQualification[qualification]?.years ?? "",
        months: prev.experienceByQualification[qualification]?.months ?? "",
        days: prev.experienceByQualification[qualification]?.days ?? "",
        [field]: num,
      },
    },
  }))

  clearError(`exp_${qualification}`)
}


  function handleMultiCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key:
      | "vesselTypes"
      | "shoresideExperience"
      | "surveyingExperience"
      | "vesselTypeSurveyingExperience"
      | "accreditations"
      | "coursesCompleted"
  ) {
    const { value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [key]: checked ? [...prev[key], value] : prev[key].filter((v: string) => v !== value),
    }))

    clearError(key)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, cvFile: file }))
    clearError("cvFile")
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null

    if (!file) {
      setFormData((prev) => ({ ...prev, photoFile: null }))
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.photoFile
        return copy
      })
      return
    }

    const MAX = 20 * 1024 * 1024

    if (!file.type.startsWith("image/")) {
      e.target.value = ""
      setFormData((prev) => ({ ...prev, photoFile: null }))
      setErrors((prev) => ({ ...prev, photoFile: "Please upload an image (JPG/PNG/WebP)." }))
      return
    }

    if (file.size > MAX) {
      e.target.value = ""
      setFormData((prev) => ({ ...prev, photoFile: null }))
      setErrors((prev) => ({ ...prev, photoFile: "Photo must be 20MB or less." }))
      return
    }

    setErrors((prev) => {
      const copy = { ...prev }
      delete copy.photoFile
      return copy
    })
    setFormData((prev) => ({ ...prev, photoFile: file }))
  }

  function setMarketingConsent(checked: boolean) {
    setFormData((prev) => ({ ...prev, marketingConsent: checked }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const eMap = validate(formData)
    setErrors(eMap)
    console.log("Validation errors:", eMap)

    if (Object.keys(eMap).length > 0) {
      setLoading(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
      

    }

    try {
      const payload = new FormData()

      payload.append("firstName", formData.firstName)
      payload.append("lastName", formData.lastName)
      payload.append("phoneNumber", formData.phoneNumber)
      payload.append("mobileNumber", formData.mobileNumber)
      payload.append("nationality", formData.nationality)
      payload.append("employmentStatus", formData.employmentStatus)
      payload.append("companyName", formData.companyName)

      payload.append("email", formData.email)
      payload.append("dobDD", formData.dobDD)
      payload.append("dobMM", formData.dobMM)
      payload.append("dobYYYY", formData.dobYYYY)
      payload.append("yearStarted", formData.yearStarted)
      payload.append("heardAbout", formData.heardAbout)
      payload.append("street1", formData.street1)
      payload.append("street2", formData.street2)
      payload.append("city", formData.city)
      payload.append("postalCode", formData.postalCode)
      payload.append("country", formData.country)
      payload.append("stateRegion", formData.stateRegion)

      payload.append("discipline", formData.discipline)
      payload.append("rank", formData.rank)

      payload.append("qualifiedDD", formData.qualifiedDD)
      payload.append("qualifiedMM", formData.qualifiedMM)
      payload.append("qualifiedYYYY", formData.qualifiedYYYY)

      payload.append("experienceByQualification", JSON.stringify(formData.experienceByQualification))
      payload.append("qualifications", JSON.stringify(formData.qualifications))

      payload.append("vesselTypes", JSON.stringify(formData.vesselTypes))
      payload.append("shoresideExperience", JSON.stringify(formData.shoresideExperience))
      payload.append("surveyingExperience", JSON.stringify(formData.surveyingExperience))
      payload.append("vesselTypeSurveyingExperience", JSON.stringify(formData.vesselTypeSurveyingExperience))
      payload.append("accreditations", JSON.stringify(formData.accreditations))
      payload.append("coursesCompleted", JSON.stringify(formData.coursesCompleted))

      // ✅ NEW: references array
      payload.append("references", JSON.stringify(formData.references))

      payload.append("inspectionCost", formData.inspectionCost)
      payload.append("marketingConsent", String(formData.marketingConsent))

      if (formData.cvFile) payload.append("cvFile", formData.cvFile)
      if (formData.photoFile) payload.append("photoFile", formData.photoFile)

      const res = await fetch("http://localhost:5000/api/form/submit", {
        method: "POST",
        body: payload,
      })

      if (!res.ok) {
        alert("Error submitting form. Please try again.")
        return
      }

      alert("Form submitted successfully!")
      setFormData(initialState)
      setErrors({})
    } catch (err) {
      console.error("Error submitting form:", err)
      alert("Error submitting form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    loading,
    showCompanyName,
    errors,

    handleChange,
    handleSubmit,

    handleCheckboxChange,
    handleExperienceChange,
    handleMultiCheckboxChange,

    handleFileChange,
    handlePhotoChange,
                              
    setMarketingConsent,
    setErrors,

    addReference,
    removeReference,
    updateReference,
  }
}
