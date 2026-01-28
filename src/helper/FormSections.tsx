import React from "react";
import type { FormData } from "./formTypes";
import {
  NATIONALITIES,
  COUNTRIES,
  QUALIFICATIONS,
  VESSEL_TYPES,
  SHORESIDE_EXPERIENCE,
  SURVEYING_EXPERIENCE,
  VESSEL_TYPE_SURVEYING_EXPERIENCE,
  ACCREDITATIONS,
  COURSES_COMPLETED,
} from "./formConstants";

type Props = {
  formData: FormData;
  loading: boolean;
  showCompanyName: boolean;
  errors: Record<string, string>;

  addReference: () => void;
  removeReference: (index: number) => void;
  updateReference: (
    index: number,
    field: "name" | "contact",
    value: string,
  ) => void;

  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;

  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExperienceChange: (
    qualification: string,
    field: "years" | "months" | "days",
    value: string,
  ) => void;

  handleMultiCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key:
      | "vesselTypes"
      | "shoresideExperience"
      | "surveyingExperience"
      | "vesselTypeSurveyingExperience"
      | "accreditations"
      | "coursesCompleted",
  ) => void;

  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMarketingConsent: (checked: boolean) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormSections({
  formData,
  loading,
  showCompanyName,
  errors,

  addReference,
  removeReference,
  updateReference,

  handleChange,
  handleSubmit,

  handleCheckboxChange,
  handleExperienceChange,
  handleMultiCheckboxChange,

  handleFileChange,
  setMarketingConsent,
  handlePhotoChange,
}: Props) {
  // ✅ premium UI tokens (immersive + accessible)
  const labelBase =
    "block text-[15px] font-semibold text-slate-900 tracking-[0.01em]";

  const hint = "text-[14px] text-slate-500 mt-1 leading-5";
  const err = "text-[14px] text-red-600 mt-1";

  const inputBase =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 shadow-sm outline-none transition " +
    "placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/15 hover:border-slate-400";

  const selectBase =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 shadow-sm outline-none transition " +
    "focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/15 hover:border-slate-400";

  const smallBox =
    "rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 shadow-sm outline-none w-[76px] text-center transition";

  const yearBox =
    "rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 shadow-sm outline-none w-[105px] text-center transition";

  // Card feels more “layered” and grouped (Gestalt)
  const sectionCard =
    "rounded-2xl bg-white/80 backdrop-blur-md p-6 sm:p-7 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70";

  const sectionTitle = "text-[17px] font-bold text-slate-900";

  // Brand navy (from your reference)
  const brand = "#213A6B"; // change if you want slightly different

  // Larger clickable choice tiles (Fitts + Hick)
  const choiceTile =
    "group flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[14.5px] text-slate-900 shadow-sm transition hover:border-slate-400";

  const checkboxRadio =
    "h-2 w-2 rounded border-slate-300 text-slate-900 focus:ring-slate-300";
  const OtherTextarea = ({
    show,
    name,
    label,
    placeholder,
  }: {
    show: boolean;
    name: keyof FormData;
    label: string;
    placeholder: string;
  }) => {
    if (!show) return null;

    return (
      <div className="mt-4">
        <label className={labelBase}>{label}</label>
        <textarea
          name={name as string}
          value={(formData as any)[name] || ""}
          onChange={handleChange}
          className={`${inputBase} mt-2 min-h-[110px]`}
          placeholder={placeholder}
          rows={4}
        />
        {errors[String(name)] ? (
          <p className={err}>{errors[String(name)]}</p>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen font-sans bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 flex justify-center items-start py-10 px-4"
      style={{ ["--brand" as any]: brand }}
    >
      <div className="w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80">
          {/* subtle top glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-200/50 to-transparent" />

          <div className="relative p-6 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: "var(--brand)" }}
                  >
                    FATHOM SURVEYOR
                  </h1>

                  <p className="mt-2 text-[13px] text-slate-600">
                    Application Form • Complete all required fields
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Live application
                </div>
              </div>

              <div className="mt-5 space-y-3 text-[16px] text-slate-700 leading-6">
                <p>
                  Thanks for your interest in joining the {""}
                  <b>Fathom Surveyor Network</b>
                  .We work with experienced marine surveyors and follow a
                  careful review process.
                </p>

                <p>
                  Please note that the review process may take up to{" "}
                  <b>28 days</b>. We will contact you directly with the next
                  steps. You do not need to contact us in the meantime.
                </p>

                <p>
                  After submitting the form, you’ll be redirected back to our
                  website and will receive an email confirmation.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic details */}
              <section className={sectionCard}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <h2 className={sectionTitle}>Basic details</h2>
                  <p className="text-[14px] leading-6 text-slate-700">
                    Fields marked <span className="text-red-600">*</span> are
                    required
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.firstName ? (
                      <p className={err}>{errors.firstName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.lastName ? (
                      <p className={err}>{errors.lastName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>Please include country code</p>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="+44 7700 900123"
                    />
                    {errors.phoneNumber ? (
                      <p className={err}>{errors.phoneNumber}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>Mobile phone number</label>
                    <p className={hint}>Add your mobile number for WhatsApp</p>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelBase}>
                      Nationality <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className={selectBase}
                    >
                      <option value="">Select nationality</option>
                      {NATIONALITIES.map((nation) => (
                        <option key={nation} value={nation}>
                          {nation}
                        </option>
                      ))}
                    </select>
                    {errors.nationality ? (
                      <p className={err}>{errors.nationality}</p>
                    ) : null}
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelBase}>
                      Do you work for a surveying company?{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      Do not answer if you are self-employed.
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { v: "self", t: "No, I work for myself" },
                        { v: "employee", t: "Yes, I am an employee" },
                        { v: "owner", t: "Yes, I own the company" },
                      ].map((o) => (
                        <label key={o.v} className={choiceTile}>
                          <input
                            type="radio"
                            name="employmentStatus"
                            value={o.v}
                            checked={formData.employmentStatus === o.v}
                            onChange={handleChange}
                            className={checkboxRadio}
                          />
                          <span className="leading-5">{o.t}</span>
                        </label>
                      ))}
                    </div>

                    {errors.employmentStatus ? (
                      <p className={err}>{errors.employmentStatus}</p>
                    ) : null}
                  </div>

                  {showCompanyName ? (
                    <div className="md:col-span-2">
                      <label className={labelBase}>
                        Company name <span className="text-red-600">*</span>
                      </label>
                      <p className={hint}>
                        If you work for, or own, a company please enter the
                        company name.
                      </p>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={inputBase}
                      />
                      {errors.companyName ? (
                        <p className={err}>{errors.companyName}</p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white p-4 ring-1 ring-amber-200/60">
                  <p className="text-[13px] text-amber-900 leading-5">
                    If you work for a company that is already part of the fathom
                    Surveyor Network, you must ensure that your email address is
                    unique.
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-amber-900">
                    Do not enter a generic company email address.
                  </p>
                  <p className="mt-2 text-[13px] text-amber-900">
                    If you are unsure, please contact{" "}
                    <a
                      href="mailto: contact@fathommarineconsultants.com"
                      className="underline font-semibold"
                    >
                      contact@fathommarineconsultants.com
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Contact + DOB */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Contact & verification</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-9 items-start">
                  <div className="lg:col-span-1">
                    <label className={labelBase}>
                      Email <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      This email address will be registered to your account.
                    </p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.email ? (
                      <p className={err}>{errors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      DOB <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      Enter your Date of Birth for age verification purposes
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <input
                        name="dobDD"
                        value={formData.dobDD}
                        onChange={handleChange}
                        placeholder="DD"
                        className={smallBox}
                      />
                      <span className="text-slate-300">/</span>
                      <input
                        name="dobMM"
                        value={formData.dobMM}
                        onChange={handleChange}
                        placeholder="MM"
                        className={smallBox}
                      />
                      <span className="text-slate-300">/</span>
                      <input
                        name="dobYYYY"
                        value={formData.dobYYYY}
                        onChange={handleChange}
                        placeholder="YYYY"
                        className={yearBox}
                      />
                    </div>

                    {errors.dobDD ? (
                      <p className={err}>{errors.dobDD}</p>
                    ) : null}
                    {errors.dobMM ? (
                      <p className={err}>{errors.dobMM}</p>
                    ) : null}
                    {errors.dobYYYY ? (
                      <p className={err}>{errors.dobYYYY}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      Year started in industry
                    </label>
                    <p className={hint}>
                      Enter the year you started your maritime career
                    </p>
                    <input
                      name="yearStarted"
                      value={formData.yearStarted}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <label className={labelBase}>
                      Where did you hear about fathom?{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="heardAbout"
                      value={formData.heardAbout}
                      onChange={handleChange}
                      className={selectBase}
                    >
                      <option value="">Please Select</option>
                      <option value="Google">Google</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Recommended by the friend">
                        Recommended by the friend
                      </option>
                      <option value="Recommended by the colleague">
                        Recommended by the colleague
                      </option>
                      <option value="Referral">Referral</option>
                      <option value="Maritime Website">Maritime Website</option>
                      <option value="Industry Event">Industry Event</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.heardAbout ? (
                      <p className={err}>{errors.heardAbout}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Address */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Address</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>
                      Street address <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="street1"
                      value={formData.street1}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.street1 ? (
                      <p className={err}>{errors.street1}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>Street address 2</label>
                    <input
                      name="street2"
                      value={formData.street2}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className={labelBase}>
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.city ? <p className={err}>{errors.city}</p> : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      Postal code <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.postalCode ? (
                      <p className={err}>{errors.postalCode}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={selectBase}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c === "Please Select" ? "" : c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.country ? (
                      <p className={err}>{errors.country}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelBase}>
                      State/Region <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="stateRegion"
                      value={formData.stateRegion}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.stateRegion ? (
                      <p className={err}>{errors.stateRegion}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Accuracy */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Accuracy</h2>
                <p className="mt-3 text-[14px] text-slate-700 leading-6">
                  The information provided on this form will be used to create
                  your profile within the fathom Surveyor Network. The
                  information must be accurate and reflect your experiences and
                  knowledge bases. Any instance where inaccurate information is
                  submitted will result in instant cancellation of applications.
                </p>
              </section>

              {/* Discipline + Rank */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Discipline & rank</h2>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Discipline dropdown */}
                  <div>
                    <label className={labelBase}>
                      Discipline <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>Select your maritime discipline.</p>

                    <select
                      name="discipline"
                      value={formData.discipline}
                      onChange={handleChange}
                      className={`${selectBase} mt-3`}
                    >
                      <option value="">Please Select</option>
                      <option value="deck">Deck</option>
                      <option value="engine">Engine</option>
                      <option value="naval">Naval Arch</option>
                      <option value="other">Other</option>
                    </select>

                    {errors.discipline ? (
                      <p className={err}>{errors.discipline}</p>
                    ) : null}

                    {/* ✅ Other textarea for Discipline */}
                    <OtherTextarea
                      show={formData.discipline === "other"}
                      name="disciplineOther"
                      label="Other discipline (please specify)"
                      placeholder="Write your discipline..."
                    />
                  </div>

                  {/* Rank dropdown */}
                  <div>
                    <label className={labelBase}>
                      Rank <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      Select the highest rank you sailed at.
                    </p>

                    <select
                      name="rank"
                      value={formData.rank}
                      onChange={handleChange}
                      className={`${selectBase} mt-3`}
                    >
                      <option value="">Please Select</option>
                      <option value="master_mariner">Master Mariner</option>
                      <option value="tow_master">Tow Master</option>
                      <option value="chief_officer">Chief Officer</option>
                      <option value="second_third_officer">
                        Second/Third Officer
                      </option>
                      <option value="third_fourth_engineer">
                        Third/Fourth Engineer
                      </option>
                      <option value="naval_architect">Naval Architect</option>
                      <option value="yacht_master">Yacht Master</option>
                      <option value="relevant_maritime_degree">
                        Relevant Maritime Degree
                      </option>
                      <option value="other">Other</option>
                    </select>

                    {errors.rank ? <p className={err}>{errors.rank}</p> : null}

                    {/* ✅ Other textarea for Rank */}
                    <OtherTextarea
                      show={formData.rank === "other"}
                      name="rankOther"
                      label="Other rank (please specify)"
                      placeholder="Write your rank..."
                    />
                  </div>
                </div>
              </section>

              {/* Qualifications + Experience */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Qualifications & experience</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* LEFT */}
                  <div>
                    <label className={labelBase}>
                      Select your maritime qualification{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>Select your highest qualification.</p>

                    <div className="mt-3 space-y-3">
                      {QUALIFICATIONS.map((q) => (
                        <label key={q} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={q}
                            checked={formData.qualifications.includes(q)}
                            onChange={handleCheckboxChange}
                            className={checkboxRadio}
                          />
                          {q}
                        </label>
                      ))}
                    </div>

                    {errors.qualifications ? (
                      <p className={err}>{errors.qualifications}</p>
                    ) : null}
                    <OtherTextarea
                      show={formData.qualifications.includes("Other")}
                      name={"qualificationsOther"}
                      label="Other qualification (please specify)"
                      placeholder="Write your qualification..."
                    />
                  </div>

                  {/* RIGHT */}
                  <div className="lg:pl-2">
                    <label className={labelBase}>
                      Experience <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      For each qualification selected, enter your experience.
                    </p>

                    {formData.qualifications.length > 0 ? (
                      <div className="mt-3 space-y-3">
                        {formData.qualifications.map((q) => {
                          const exp = formData.experienceByQualification[q] ?? {
                            years: "",
                            months: "",
                            days: "",
                          };

                          return (
                            <div
                              key={q}
                              className="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-4 shadow-sm"
                            >
                              <p className="text-[13px] font-semibold text-slate-800">
                                {q}
                              </p>

                              <div className="mt-3 grid grid-cols-3 gap-3">
                                <input
                                  value={exp.years}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      q,
                                      "years",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Years"
                                  className={inputBase}
                                />
                                <input
                                  value={exp.months}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      q,
                                      "months",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Months"
                                  className={inputBase}
                                />
                                <input
                                  value={exp.days}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      q,
                                      "days",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Days"
                                  className={inputBase}
                                />
                              </div>

                              {errors[`exp_${q}`] ? (
                                <p className={err}>{errors[`exp_${q}`]}</p>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-[13px] text-slate-600 ring-1 ring-slate-200/60">
                        Select a qualification to enter experience.
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Experience areas */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Experience areas</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>
                      Vessel Type Sailing Experience{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      Select vessel types you sailed on as a qualified Officer.
                    </p>

                    <div className="mt-3 space-y-3">
                      {VESSEL_TYPES.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.vesselTypes.includes(item)}
                            onChange={(e) =>
                              handleMultiCheckboxChange(e, "vesselTypes")
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>

                    {errors.vesselTypes ? (
                      <p className={err}>{errors.vesselTypes}</p>
                    ) : null}
                    <OtherTextarea
                      show={formData.vesselTypes.includes("Other")}
                      name={"vesselTypesOther"}
                      label="Other vessel type (please specify)"
                      placeholder="Write vessel type(s)..."
                    />
                  </div>

                  <div>
                    <label className={labelBase}>Shoreside Experience</label>

                    <div className="mt-3 space-y-3">
                      {SHORESIDE_EXPERIENCE.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.shoresideExperience.includes(
                              item,
                            )}
                            onChange={(e) =>
                              handleMultiCheckboxChange(
                                e,
                                "shoresideExperience",
                              )
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <OtherTextarea
                      show={formData.shoresideExperience.includes("Other")}
                      name={"shoresideExperienceOther"}
                      label="Other shoreside experience (please specify)"
                      placeholder="Write shoreside experience..."
                    />
                  </div>
                </div>
              </section>

              {/* Surveying */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Surveying</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>Surveying Experience</label>
                    <p className={hint}>
                      Select all types of surveys you have carried out.
                    </p>

                    <div className="mt-3 space-y-3">
                      {SURVEYING_EXPERIENCE.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.surveyingExperience.includes(
                              item,
                            )}
                            onChange={(e) =>
                              handleMultiCheckboxChange(
                                e,
                                "surveyingExperience",
                              )
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <OtherTextarea
                      show={formData.surveyingExperience.includes("Other")}
                      name={"surveyingExperienceOther"}
                      label="Other surveying experience (please specify)"
                      placeholder="Write surveying experience..."
                    />
                  </div>

                  <div>
                    <label className={labelBase}>
                      Vessel Type Surveying Experience
                    </label>
                    <p className={hint}>
                      Select vessel types you have completed surveys on.
                    </p>

                    <div className="mt-3 space-y-3">
                      {VESSEL_TYPE_SURVEYING_EXPERIENCE.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.vesselTypeSurveyingExperience.includes(
                              item,
                            )}
                            onChange={(e) =>
                              handleMultiCheckboxChange(
                                e,
                                "vesselTypeSurveyingExperience",
                              )
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <OtherTextarea
                      show={formData.vesselTypeSurveyingExperience.includes(
                        "Other",
                      )}
                      name={"vesselTypeSurveyingExperienceOther"}
                      label="Other vessel type surveying experience (please specify)"
                      placeholder="Write vessel types you surveyed..."
                    />
                  </div>
                </div>
              </section>

              {/* Accreditations & courses */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Accreditations & courses</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>Accreditation</label>
                    <p className={hint}>
                      Select any organisation that has professionally accredited
                      you.
                    </p>

                    <div className="mt-3 space-y-3">
                      {ACCREDITATIONS.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.accreditations.includes(item)}
                            onChange={(e) =>
                              handleMultiCheckboxChange(e, "accreditations")
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <OtherTextarea
                      show={formData.accreditations.includes("Other")}
                      name={"accreditationsOther"}
                      label="Other accreditation (please specify)"
                      placeholder="Write your accreditation..."
                    />
                  </div>

                  <div>
                    <label className={labelBase}>Courses Completed</label>
                    <p className={hint}>
                      Select any courses from this list that you have completed.
                    </p>

                    <div className="mt-3 space-y-3">
                      {COURSES_COMPLETED.map((item) => (
                        <label key={item} className={choiceTile}>
                          <input
                            type="checkbox"
                            value={item}
                            checked={formData.coursesCompleted.includes(item)}
                            onChange={(e) =>
                              handleMultiCheckboxChange(e, "coursesCompleted")
                            }
                            className={checkboxRadio}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <OtherTextarea
                      show={formData.coursesCompleted.includes("Other")}
                      name={"coursesCompletedOther"}
                      label="Other course (please specify)"
                      placeholder="Write the course name..."
                    />
                  </div>
                </div>
              </section>

              {/* References */}
              <section className={sectionCard}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className={sectionTitle}>
                    References <span className="text-red-600">*</span>
                  </h2>

                  <button
                    type="button"
                    onClick={addReference}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200/60"
                  >
                    + Add reference
                  </button>
                </div>

                <p className={hint}>
                  At least 2 references are required. Add more if you’d like.
                </p>

                <div className="mt-4 space-y-4">
                  {formData.references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[14px] font-semibold text-slate-900">
                          Reference {idx + 1}
                          {idx < 2 ? (
                            <span className="ml-2 text-[12px] text-slate-500">
                              (required)
                            </span>
                          ) : null}
                        </p>

                        {idx >= 2 ? (
                          <button
                            type="button"
                            onClick={() => removeReference(idx)}
                            className="text-[13px] font-semibold text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelBase}>Name</label>
                          <input
                            type="text"
                            value={ref.name}
                            onChange={(e) =>
                              updateReference(idx, "name", e.target.value)
                            }
                            className={inputBase}
                          />
                          {errors[`ref_${idx}_name`] ? (
                            <p className={err}>{errors[`ref_${idx}_name`]}</p>
                          ) : null}
                        </div>

                        <div>
                          <label className={labelBase}>Email or contact</label>
                          <input
                            type="text"
                            value={ref.contact}
                            onChange={(e) =>
                              updateReference(idx, "contact", e.target.value)
                            }
                            className={inputBase}
                          />
                          {errors[`ref_${idx}_contact`] ? (
                            <p className={err}>
                              {errors[`ref_${idx}_contact`]}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Attachments & inspection cost */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Attachments & inspection cost</h2>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* LEFT */}
                  <div className="space-y-6">
                    <div>
                      <label className={labelBase}>
                        Profile Photo <span className="text-red-600">*</span>
                      </label>
                      <p className={hint}>
                        Upload a clear photo (JPG/PNG). Max size: 5MB.
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white cursor-pointer shadow-sm transition hover:bg-slate-800 focus-within:ring-4 focus-within:ring-slate-200/60">
                          Choose file
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange as any}
                            className="hidden"
                          />
                        </label>

                        <span className="text-[13px] text-slate-700 truncate">
                          {formData.photoFile
                            ? formData.photoFile.name
                            : "No file chosen"}
                        </span>
                      </div>

                      {errors.photoFile ? (
                        <p className={err}>{errors.photoFile}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className={labelBase}>
                        Original CV File <span className="text-red-600">*</span>
                      </label>
                      <p className={hint}>
                        Share a copy of your CV in PDF or DOC format. Your CV
                        should include seagoing experience (including vessel
                        types), shoreside experience and education.
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white cursor-pointer shadow-sm transition hover:bg-slate-800 focus-within:ring-4 focus-within:ring-slate-200/60">
                          Choose file
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>

                        <span className="text-[13px] text-slate-700 truncate">
                          {formData.cvFile
                            ? formData.cvFile.name
                            : "No file chosen"}
                        </span>
                      </div>

                      {errors.cvFile ? (
                        <p className={err}>{errors.cvFile}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div>
                    <label className={labelBase}>
                      Inspection Cost <span className="text-red-600">*</span>
                    </label>
                    <p className={hint}>
                      Provide your inspection fee expectations (USD) to conduct
                      a condition inspection within 250km of your home address.
                    </p>

                    <p className={`${hint} mt-2`}>
                      <span className="font-semibold">Please note:</span> This
                      fee is non-binding. You will be given the opportunity to
                      bid for inspections once registered.
                    </p>

                    <textarea
                      name="inspectionCost"
                      value={formData.inspectionCost}
                      onChange={handleChange}
                      className={`${inputBase} mt-3 min-h-[120px]`}
                      rows={5}
                    />

                    {errors.inspectionCost ? (
                      <p className={err}>{errors.inspectionCost}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Privacy + Consent */}
              <section className={sectionCard}>
                <h2 className={sectionTitle}>Privacy & consent</h2>

                <div className="mt-3 space-y-3 text-[14px] text-slate-700 leading-6">
                  <p>
                    Fathom is committed to protecting and respecting your
                    privacy, and we’ll only use your personal information to
                    administer your account and to provide the products and
                    services you requested.
                  </p>

                  <label className="flex items-start gap-3 rounded-2xl bg-white/70 ring-1 ring-slate-200/70 p-5 shadow-sm">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className={`${checkboxRadio} mt-[3px] h-5 w-5 shrink-0`}
                    />

                    <span className="text-[15px] leading-6 text-slate-700">
                      I agree to receive other communications from Fathom.
                      <span className="block text-[13px] text-slate-600 mt-1">
                        {/* optional helper text */}
                      </span>
                    </span>
                  </label>

                  <p>
                    By clicking submit below, you consent to allow Fathom Marine
                    (Surveyor) to store and process the personal information
                    submitted above to provide the content requested.
                  </p>
                </div>
              </section>

              {/* Submit */}
              <div className="flex items-center justify-end pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200/60 disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* subtle footer spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
}
