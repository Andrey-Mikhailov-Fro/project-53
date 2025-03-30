import DatePicker from "react-datepicker";
import CardFieldsStore, { Field } from "../../../../../stores/CardFieldsStore";
import { observer } from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useState } from "react";

type ProfileFieldProps = {
  variant: string;
  field: Field;
};

const validateField = (value: string, type?: string): boolean => {
  switch (type) {
    case "name":
    case "surname":
    case "patronymic":
      return /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё'\-]{1,50}$/.test(value);

    case "phone":
      return /^\+?\d[\d\-\(\) ]{9,}\d$/.test(value.replace(/[\s\-\(\)]/g, ""));

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    default:
      return true;
  }
};

const InputField = observer(({ data }: { data: Field }) => {
  const isDateInput = data.tag.type === "date";

  const value = CardFieldsStore.values.find((item) => item.fieldId === data.id)
    ?.value as string;

  const [error, setError] = useState("");

  console.log(error);

  const handleChange = (newValue: string) => {
    if (
      data.tag.validationType &&
      !validateField(newValue, data.tag.validationType)
    ) {
      setError("Некорректное значение");
    } else {
      setError("");
    }
    CardFieldsStore.updateValue(data.id, newValue);
  };

  if (isDateInput) {
    return (
      <DatePicker
        id={data.id}
        className="profile-input"
        showIcon
        toggleCalendarOnIconClick
        selected={new Date(value)}
        onChange={(date) => {
          console.log(date);
          const update = date ? format(date, "yyyy-MM-dd") : "";
          console.log(update);
          CardFieldsStore.updateValue(data.id, update);
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText={data.placeholder}
      />
    );
  }

  return (
    <div className="profile-input-container">
      <input
        id={data.id}
        type={data.tag.type}
        placeholder={data.placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`profile-input ${error ? "error" : ""}`}
        required
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

const SelectField = observer(({ data }: { data: Field }) => {
  const value = CardFieldsStore.values.find((item) => item.fieldId === data.id)
    ?.value as string;

  return (
    <select
      id={data.id}
      value={value}
      onChange={(e) => CardFieldsStore.updateValue(data.id, e.target.value)}
      required
      className="profile-select"
    >
      <option value="" disabled hidden>
        {data.placeholder}
      </option>
      {data.tag.options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

function ProfileField({ variant, field }: ProfileFieldProps) {
  const fieldVariants = {
    input: <InputField data={field} />,
    select: <SelectField data={field} />,
  };

  return (
    <div className="profile-field">
      <label htmlFor={field.id}>{field.name}</label>
      {fieldVariants[variant as keyof typeof fieldVariants]}
    </div>
  );
}

export default observer(ProfileField);
