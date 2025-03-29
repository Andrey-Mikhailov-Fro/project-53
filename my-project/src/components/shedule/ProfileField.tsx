import DatePicker from "react-datepicker";
import CardFieldsStore, { Field } from "../../stores/CardFieldsStore";
import { observer } from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

type ProfileFieldProps = {
  variant: string;
  field: Field;
};

const InputField = observer(({ data }: { data: Field }) => {
  const isDateInput = data.tag.type === "date";

  const value = CardFieldsStore.values.find((item) => item.fieldId === data.id)
    ?.value as string;

  if (isDateInput) {
    return (
      <DatePicker
        id={data.id}
        className="profile-input"
        showIcon
        toggleCalendarOnIconClick
        selected={value ? parse(value, 'dd.MM.yyyy', new Date()) : null}
        onChange={(date) => {
          const update = date ? format(date, 'yyyy-MM-dd') : "";
          console.log(update);
          CardFieldsStore.updateValue(data.id, update);
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText={data.placeholder}
      />
    );
  }

  return (
    <input
      id={data.id}
      type={data.tag.type}
      placeholder={data.placeholder}
      value={value}
      onChange={(e) => CardFieldsStore.updateValue(data.id, e.target.value)}
      className="profile-input"
      required
    />
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
