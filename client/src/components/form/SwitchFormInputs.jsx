
import SelectCustom from "./SelectCustom";
import TextareaCustom from "./TextareaCustom";
import InputCustom from "./InputCustom";
import CheckBox from "./CheckBox";

function SwitchFormInputs({ structureForm, HandleChange, data = null}) {
  return (
    <>
      {structureForm.map((item, index) => {
        if (item.type == "select")
          return (
            <SelectCustom
              key={index}
              label={item.label}
              id={item.id}
              value={data}
              required={item.required ?? false}
              options={item.options}
              HandleChange={HandleChange}
            />
          );
        if (item.type == "textarea")
          return (
            <TextareaCustom
              key={index}
              label={item.label}
              id={item.id}
              data={data}
              required={item.required ?? false}
              options={item.options}
              HandleChange={HandleChange}
              placeholder={item.placeholder ?? "" }
            />
          );
        if (item.type == "empty") return <div></div>;
        if (item.type == "checkbox")
          return (
            <CheckBox
              label={item.label}
              id={item.value}
              key={index}
              data={data}
              HandleChange={HandleChange}
            />
          );
        else
          return (
            <InputCustom
              key={index}
              label={item.label}
              id={item.id}
              type={item.type}
              required={item.required ?? false}
              HandleChange={HandleChange}
              value={data}
              placeholder={item.placeholder ?? "" }
            />
          );
      })}
    </>
  );
}

export default SwitchFormInputs;
