import FormSections from "../helper/FormSections"
import { useSurveyorForm } from "../helper/useSurveyorForm"

export default function FormPage() {
  const {
    formData,
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
    addReference,
    removeReference,
    updateReference,
  } = useSurveyorForm()

  return (
    <FormSections
      formData={formData}
      loading={loading}
      showCompanyName={showCompanyName}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCheckboxChange={handleCheckboxChange}
      handleExperienceChange={handleExperienceChange}
      handleMultiCheckboxChange={handleMultiCheckboxChange}
      handleFileChange={handleFileChange}
      handlePhotoChange={handlePhotoChange}
      setMarketingConsent={setMarketingConsent}
      addReference={addReference}
      removeReference={removeReference}
      updateReference={updateReference}

    />
  )
}
